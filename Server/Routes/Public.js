const express = require('express');


const app = express();
const path = require('path');
const publicPath = path.resolve(__dirname, '../Public');


app.use(express.static(publicPath));


module.exports = app;
