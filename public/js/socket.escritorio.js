var socket = io();

let searchParams = new URLSearchParams(window.location.search);


if(!searchParams.has('desk')){
    window.location = 'index.html';
    throw new Error('El desk es necesario');
}

let desk = searchParams.get('desk');
console.log(desk);


$('h1').text('Escritorio: ' + desk);

$('#callNext').on('click',function(){
    socket.emit('attendTicket',{desk:desk},function(resp){
        $('small').text(resp.number);  
    })
})