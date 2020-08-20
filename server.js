const express = require('express');
const path = require('path');

const port = process.env.PORT || 8080;
const app = express();

// https://www.tutorialspoint.com/expressjs/expressjs_static_files.htm
app.use(express.static(__dirname));
app.use(express.static(path.join(__dirname, './frontend/build')));

app.get('/*', (req, res) => {
    res.sendFile(path.join(__dirname, './frontend/build', 'index.html'));
});
app.listen(port);
