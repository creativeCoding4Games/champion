var express = require('express');
var app = express();

app.use(express.static('champion.css'));
app.use(express.static('index.html'));

app.listen(3050);
