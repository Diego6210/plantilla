const { io } = require('../server');
const { Usuarios } = require('../classes/Classe_Usuario');
const { crearMensaje } = require('../classes/Classe_Mensaje');


const usuarios = new Usuarios();
//let Persona = []
io.on('connection', (client) => {

    client.on('ConectarServer', (data, callback) => {

        console.log('Usuario conectado: ' + data.Usuario );
        var Persona = usuarios.agregarPersona(client.id, data.IdUsuario, data.Usuario);
        //console.log(Persona);
    });

    //client.broadcast.emit('broadcast','test connect user');
    
    client.on('broadcast', (data) => {
        client.broadcast.emit('broadcast',data.alert+' : '+data.mensaje);
    });

    client.on('disconnectUsuario', () => {
        var personaBorrada = usuarios.borrarPersona(client.id);        
        console.log(`El usuario ${ personaBorrada[0].Usuario } se desconecto`);
    });

    client.on('disconnect', () => {
        var personaBorrada = usuarios.borrarPersona(client.id);        
        if(personaBorrada != null){
            console.log(`El usuario ${ personaBorrada } se desconecto`);
        }
    });

    client.on('cerrarSession', () => {
        var personaBorrada = usuarios.borrarPersona(client.id);        
        if(personaBorrada != null){
            console.log(`El usuario ${ personaBorrada } se desconecto`);
        }
    });

    client.on('enviarMensaje', (data) => {
        let para = usuarios.getPersonabyID(data.IdUsuario);
        let IdUsuario = usuarios.getPersonabyIDUsuario(client.id);
        if(para != null){
            client.broadcast.to(para).emit('mensajePrivado', {
                Usuario:data.Usuario, 
                Mensaje: data.Mensaje,
                IdUsuario:IdUsuario
            });
        }
    });

});