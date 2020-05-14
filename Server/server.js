require('./Config/config');

const express = require('express');
const bodyParser = require('body-parser');
const socketIO = require('socket.io');
const http = require('http');



const app = express();
let server = http.createServer(app);
module.exports.io = socketIO(server);
require('./Socket/Socket');



app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(require('./Routes/router'));



server.listen(process.env.PORT, () =>{
    console.log(`Servidor corriendo en puerto ${ process.env.PORT }`);
});