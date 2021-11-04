import dotenv from 'dotenv';
dotenv.config();

import express from 'express';
import authRoute from './routes/authRoute';
import morgan from 'morgan';
import cors from 'cors';

const app = express();

const PORT = 8082;

app.use(express.json());

app.use(cors({
	origin: 'http://localhost:3000',
	credentials: true,
}));

app.use(morgan('dev'));

app.use('/api', authRoute);

app.listen(PORT, () => {
	console.log(
		'Authentication server started on port', PORT
	);
});