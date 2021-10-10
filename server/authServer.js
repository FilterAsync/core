const express = require('express');
const app = express();
const path = require('path');
const authApiRoute = require(path.resolve('server/routes/authRoute.js'));
const morgan = require('morgan');

const PORT = process.env.PORT || 4000;

app.use('/api', authApiRoute);

// ok done
// meet in authARoute.js
app.listen(PORT, () => {
    console.log(`authentication server started on port ${PORT}`)
});