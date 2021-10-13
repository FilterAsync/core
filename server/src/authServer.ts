import express from 'express';
import { authApiRouter } from './routes';

const PORT = process.env.PORT || 4000;
const app = express();

app.use('/api', authApiRouter);

app.listen(PORT, () => {
	console.log(
		`authentication server started on port ${PORT}`
	);
});
