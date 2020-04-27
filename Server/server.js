require('./Config/config');

const express = require('express');
const bodyParser = require('body-parser');


const app = express();


app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(require('./Routes/router'));
//app.use(express.static(__dirname + '../Image'));



app.listen(process.env.PORT, () =>{
    console.log("Corriendo en el puerto 3000")
});