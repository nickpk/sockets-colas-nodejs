const { io } = require('../server');

const {TicketControl} = require('../classes/tickets-control');
const ticketControl = new TicketControl();

io.on('connection', (client) => {

    client.on('nextTicket',function(data,callback){
        let ticket = ticketControl.nextTicket();
        console.log('Ticket: ',ticket);
        callback(ticket);
    })

    client.emit('actualState',{
        actual:ticketControl.getLastTicket(),
        last4 :ticketControl.getLast4()
    });

    client.on('attendTicket', (data,callback)=> {
        if(!data.desk){
            return callback({
                err:true,
                msg:'El escritorio es necesario'
            })
        }
        let attendTicket = ticketControl.attendTicket(data.desk);
        callback(attendTicket);

        //actualizar o notificar cambios en los ultimos 4

        client.broadcast.emit('last4',ticketControl.getLast4())

    });

});