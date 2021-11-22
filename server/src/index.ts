import dotenv from "dotenv";

dotenv.config();

import express from "express";
import cors from "cors";
import session from "express-session";
import redis from "redis";
import connectRedis from "connect-redis";
import socketio from "socket.io";
import type {Socket} from "socket.io";
import {createServer} from "http";
import mongoose from "mongoose";
import userSchema from "./models/userSchema";
import postSchema from "./models/postSchema";
import argon2 from "argon2";
import type {RequestHandler} from "express";

const PORT = 8080;

const route = express.Router();
const uri = process.env.PRIVATEKEY;

const User = mongoose.model("User", userSchema);
const Post = mongoose.model("Post", postSchema);

(async function connectMongoDB() {
    try {
        await mongoose.connect(uri);
    } catch (err) {
        return console.log(err);
    }
    console.log("Connected to database");
})();

const verifySession: RequestHandler = (req, res, next) => {
    if (req.session && req.session.userId) {
        return next();
    }
    res.status(401).json('You must authenticate in order to access this server');
};

route.post("/signup", async (req, res) => {
    let userObj = {
        name: req.body.name,
        pass: await argon2.hash(req.body.pass),
        email: req.body.email,
    };

    const user = new User(userObj);
    user.save((err) => {
        if (err) return console.log;
        console.log("No errors");
        res.sendStatus(200);
    });

    res.sendStatus(200);
});

route.post("/login", async (req, res) => {
    const user = await User.findOne({
        name: req.body.name,
    });
    // if login is incorrect
    if (!user || !(await argon2.verify(user.pass, req.body.pass))) {
        console.log("Incorrect details:", req.body);
        return res.sendStatus(403);
    }
    // setting the session's userid to the id from the database
    req.session.userId = user._id.toString();
    console.log(req.session);
    res.sendStatus(200);
});

route.get("/verify", (req, res) => {
    if (!req.session || !req.session.userId) {
        return res.sendStatus(401);
    }
    res.sendStatus(200);
});

route.post("/post", async (req, res) => {
    let postObj = req.body;
    const post = new Post(postObj);

    try {
        await post.save();
    } catch (err) {
        return res.sendStatus(424);
    } finally {
        console.log('Successfully saved post');
    }
});

route.get("/recentposts", verifySession, async (req, res) => {
    const posts = await Post.find({});
    const postsLength = posts.length;
    res.json(posts.slice(posts.length - 11, posts.length - 1));
});

const redisClient = redis.createClient();
const redisStore = connectRedis(session);

const app = express();

const httpServer = createServer(app).listen(8081);

const io = new socketio.Server(httpServer, {
    cors: {
        origin: "http://localhost:443",
    },
});

interface ISocket extends Socket {
    name?: string;
}

io.on("connection", (socket: ISocket) => {
    console.log("User connected:", socket.id);
    socket.emit("connected", socket.id);

    socket.on("messagepacket", (packet) => {
        if (socket.name) {
            return io.sockets.emit("servermessage", {
                packet: packet,
                id: socket.id,
            });
        }
    });
});

app.use(express.json());

app.use(
    express.urlencoded({
        extended: true,
    })
);

app.use(
    cors({
        origin: "http://localhost:443",
        credentials: true,
    })
);

app.use(
    session({
        secret: "Session secret",
        store: new redisStore({
            client: redisClient,
            ttl: 24 * 60 * 60,
        }),
        name: "session",
        cookie: {
            secure: false,
            httpOnly: true,
        },
        saveUninitialized: true,
        resave: false,
    })
);

app.use("/api", route);

app.listen(PORT, () => {
    console.log("Main server started on port", PORT);
});
