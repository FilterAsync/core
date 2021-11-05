import express from 'express';
import cors from 'cors';
import session from 'express-session';
import redis from 'redis';
import connectRedis from 'connect-redis';
import socketio from 'socket.io';
import type { Socket } from 'socket.io';
import { createServer } from 'http';
import apiRoute from './routes/indexRoute';
import bodyParser from 'body-parser';

const PORT = 8080;

const redisClient = redis.createClient();
const redisStore = connectRedis(session);

const app = express();

const httpServer = createServer(app).listen(8081);
const io = new socketio.Server(httpServer, {
	cors: {
		origin: 'http://localhost:3000',
	}
});
//
// io.on('connection', (socket: Socket) => {
// 	console.log('Connection established');
// 	socket.send('Hello!');
// });

app.use(express.urlencoded({
	extended: true,
}));

app.use(cors({
	origin: 'http://localhost:3000',
	credentials: true,
}));

app.use(session({
	secret: 'Session secret',
	// store: new redisStore({
	//	client: redisClient,
	// 	ttl: 24 * 60 * 60
	// }),
	name: 'session',
	cookie: {
		secure: false,
		httpOnly: true,
		sameSite: 'strict'
	},
	saveUninitialized: true,
	resave: false,
}));

app.use('/api', apiRoute);

app.listen(PORT, () => {
	console.log('Main server started on port', PORT);
});