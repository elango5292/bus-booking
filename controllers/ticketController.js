const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

exports.bookTicket = async (req, res) => {
    const { tripId, seatNos } = req.body; 
    const { userId } = req.user; 
    const trip = await prisma.trip.findUnique({ where: { id: tripId } });
    if (!trip) return res.status(404).send('Trip not found');
  
    let tickets = [];
    for (let seatNo of seatNos) {
      if (trip.seats[seatNo] !== 0) return res.status(400).send(`Seat ${seatNo} is already booked`);
      trip.seats[seatNo] = 3;
      const ticket = await prisma.ticket.create({ data: { userId, tripId, seatNo, status: 'booked' } });
      tickets.push(ticket);
    }
  
    await prisma.trip.update({ where: { id: tripId }, data: { seats: trip.seats } });
    res.send(tickets);
  };
  

  exports.getTickets = async (req, res) => {
    const { userId } = req.user;
    const tickets = await prisma.ticket.findMany({ where: { userId } });
    res.send(tickets);
  };
  
  
  exports.cancelTicket = async (req, res) => {
    const { ticketId } = req.body;
    const { userId } = req.user;
    const ticket = await prisma.ticket.findUnique({ where: { id: ticketId } });
    if (!ticket || ticket.userId !== userId) return res.status(404).send('Ticket not found');
    const trip = await prisma.trip.findUnique({ where: { id: ticket.tripId } });
    if (new Date(trip.departureTime) <= new Date()) return res.status(400).send('Cannot cancel after departure');
    trip.seats[ticket.seatNo] = 0;
    await prisma.trip.update({ where: { id: trip.id }, data: { seats: trip.seats } });
    await prisma.ticket.update({ where: { id: ticketId }, data: { status: 'cancelled' } });
    res.send('Ticket cancelled');
  };
  
  exports.updateSeats = async (req, res) => {
    const { tripId, seatNos } = req.body; 
    const status = "2"; // pending
    const trip = await prisma.trip.findUnique({ where: { id: tripId } });
    if (!trip) return res.status(404).send('Trip not found');
    
    seatNos.forEach(seatNo => {
      trip.seats[seatNo] = status;
    });
  
    await prisma.trip.update({ where: { id: tripId }, data: { seats: trip.seats } });
    res.send('Seat statuses updated');
  };
  
  