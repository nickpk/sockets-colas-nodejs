
const fs = require('fs');

class Ticket {
    constructor(number,desk){
        this.number = number;
        this.desk = desk;
    }
}

class TicketControl {

    constructor(){
        this.ultimo = 0;
        this.hoy = new Date().getDate();
        this.tickets = [];
        this.last4 = [];

        let data = require('../data/data.json');

        if(data.hoy === this.hoy){
            this.ultimo = data.ultimo;
            this.tickets = data.tickets;
            this.last4 = data.last4;
        }else{
            this.resetCount();
        }
        
    }

    nextTicket(){
        this.ultimo += 1;
        let ticket = new Ticket(this.ultimo,null);
        this.tickets.push(ticket);

        this.saveFile();
        return `Ticket: ${this.ultimo}`;
    }

    getLastTicket(){
        return `Ticket: ${this.ultimo}`;
    }

    getLast4(){
        return this.last4;
    }

    attendTicket( desk ){
        if(this.tickets.length === 0){
            return 'No hay mas tickets';
        }
        let numberTickets = this.tickets[0].number;
        this.tickets.shift();
        let attendTicket = new Ticket(numberTickets,desk);
        this.last4.unshift(attendTicket); // lo agrega al inicio del arreglo

        if(this.last4.length > 4){
            this.last4.splice(-1,1); // borro el ultimo
        }

        console.log('Ultimos 4');
        console.log(attendTicket);

        this.saveFile();

        return attendTicket;
    }

    saveFile(){
        let jsonData ={
            ultimo : this.ultimo,
            hoy : this.hoy,
            tickets : this.tickets,
            last4 : this.last4
        }
        let jsonDataString = JSON.stringify(jsonData);
        fs.writeFileSync('./server/data/data.json',jsonDataString);
    }

    resetCount(){
        this.ultimo = 0;
        this.tickets = [];
        this.last4 = [];
        console.log('se reinicio el sistema');
        this.saveFile();
    }

}


module.exports = {
    TicketControl
}