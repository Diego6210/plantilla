var socket = io();

socket.on('connect', function() {
    console.log('Conectado al servidor');
});


socket.on('disconnect', function() {

    console.log('Perdimos conexión con el servidor');

});



socket.emit('ConnectionUser', {
    usuario: 'Fernando',
    mensaje: 'Hola Mundo'
}, function(resp) {
    console.log('respuesta server: ', resp);
});

// Escuchar información
socket.on('enviarMensaje', function(mensaje) {

    console.log('Servidor:', mensaje);

});