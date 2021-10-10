const express = require('express');
const mongoose = require('mongoose');

const PORT = process.env.PORT || 8080 // 80 is used by next.js

void (async () => {
    const app = express();

    // app.use(yeah);

    app.listen(PORT, () => {
        console.log('server started on port %s', PORT)
    });
})();