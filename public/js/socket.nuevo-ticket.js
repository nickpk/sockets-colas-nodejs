

var socket = io();

var label = $('#lblNuevoTicket');

socket.on('connect',() => {
    console.log('conectado al servidor');
})

socket.on('disconnect',() => {
    console.log('desconectado del servidor');
})

socket.on('actualState',function(ticket){
    label.text(ticket.actual);
})


$('#newTicket').on('click',function() {
    socket.emit('nextTicket',null,function(siguienteTicket){
        label.text(siguienteTicket);
    })
});

