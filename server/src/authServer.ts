import express from 'express';
import authRoute from './routes/authRoute';
import morgan from 'morgan';
import cors from 'cors';

const app = express();

const PORT = 8082;

app.use(express.json());

app.use(cors({
	origin: '*'
}));

app.use(morgan('dev'));

app.use('/api', authRoute);

app.listen(PORT, () => {
	console.log(
		`Authentication server started on port ${PORT}`
	);
});