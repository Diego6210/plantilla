const express = require('express');
const bcrypt = require('bcrypt');

const app = express();

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
    res.setHeader('Access-Control-Allow-Credentials', true);
    next();
});


app.use(require('./Upload'));
app.use(require('./Usuarios'));
app.use(require('./Tasks'));
app.use(require('./Chats'));
app.use(require('./Public'));



module.exports = app;
