const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();


exports.createTrip = async (req, res) => {
  const { busId, seats, departureTime, from, to,price,duration } = req.body;
  try {
    const newTrip = await prisma.trip.create({
      data: {
        busId,
        seats,
        from,
        to,
        departureTime,
        price,
        duration
      },
    });
    res.json(newTrip);
  } catch (error) {
    console.log(error)
    res.status(500).json({ error: 'Something went wrong' });
  }
};

exports.getTripsByDate = async (req, res) => {
  const { from, to, date } = req.query;
  try {
    const trips = await prisma.trip.findMany({
      where: {
        from,
        to,
        departureTime: {
          gte: new Date(date),
          lt: new Date(new Date(date).setDate(new Date(date).getDate() + 1))
        }
      },
    });
    res.json(trips);
  } catch (error) {
    console.log(error)
    res.status(500).json({ error: 'Something went wrong' });
  }
};

// get trip by id
exports.getTripById = async (req, res) => {
  const { id } = req.body;
  try {
    const trip = await prisma.trip.findUnique({ where: { id } });
    res.json(trip);
  } catch (error) {
    console.log(error)
    res.status(500).json({ error: 'Something went wrong' });
  }
}
