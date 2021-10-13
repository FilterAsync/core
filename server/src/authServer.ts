import express from 'express';
import authRoute from './routes/authRoute';
import morgan from 'morgan';

const app: express.Application = express();

const PORT: number = 8081;

app.use(express.json());

app.use(morgan('dev'));

app.use('/api', authRoute);

app.listen(PORT, () => {
	console.log(
		`authentication server started on port ${PORT}`
	);
});
