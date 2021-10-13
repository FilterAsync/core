import express from 'express';

const PORT = process.env.PORT || 8080; // 80 is used by next.js

void (async () => {
	const app = express();

	app.listen(PORT, () => {
		console.log('server started on port %s', PORT);
	});
})();
