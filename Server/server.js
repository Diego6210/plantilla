require('./Config/config');

const express = require('express');
const bodyParser = require('body-parser');
const socketIO = require('socket.io');
const http = require('http');



const app = express();
let server = http.createServer(app);
module.exports.io = socketIO(server);
require('./Socket/socket');



app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(require('./Routes/router'));



server.listen(process.env.PORT, () =>{
    if (err) throw new Error(err);

    console.log(`Servidor corriendo en puerto ${ port }`);
});