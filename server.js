var express = require('express');
var path= require('path');
var app = express();
var port = process.env.HTTP_PORT || 3050;

app.use(express.static(path.join(__dirname, '/public')));

app.listen(port);
console.log(`Listening on port ${port}`);
