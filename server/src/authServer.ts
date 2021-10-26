import dotenv from 'dotenv';
dotenv.config();

import express from 'express';
import authRoute from './routes/authRoute';
import session from 'express-session';
import morgan from 'morgan';
import cors from 'cors';
import redis from 'redis';
import connectRedis from 'connect-redis';

const redisClient = redis.createClient();
const redisStore = connectRedis(session);

const app = express();

const PORT = 8082;

app.use(express.json());

app.use(cors({
	origin: 'http://localhost:3000',
	credentials: true,
}));
app.use(session({
	secret: 'Session secret',
	store: new redisStore({
		client: redisClient,
		ttl: 24 * 60 * 60
	}),
	cookie: {
		secure: false,
		httpOnly: true,
		sameSite: true
	},
	saveUninitialized: true,
	resave: false,
}));

app.use(morgan('dev'));

app.use('/api', authRoute);

app.listen(PORT, () => {
	console.log(
		`Authentication server started on port ${PORT}`
	);
});