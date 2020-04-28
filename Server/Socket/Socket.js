const { io } = require('../server');


io.on('connection', (client) => {

    console.log('Se conecto un usuario ');


    client.on('ConnectionUser', (data) =>{
        console.log('Conectado al servidor: ' + data.usuario );
    });

    //client.broadcast.emit('broadcast','test connect user');
    
    client.on('broadcast', (data) => {
        client.broadcast.emit('broadcast',data.alert+' : '+data.mensaje);
    });

    client.on('disconnect', () => {
        console.log('Usuario desconectado');
    });

});