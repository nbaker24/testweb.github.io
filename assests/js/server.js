const express = require('express');
const app = express();
app.use(express.static(__dirname, {
    extensions:['html']
}));
app.listen(8080);