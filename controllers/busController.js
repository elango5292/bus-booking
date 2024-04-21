const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

exports.createBus = async (req, res) => {
  const { busNum, busName, busType } = req.body;
  try {
    const newBus = await prisma.bus.create({
      data: {
        busNum,
        busName,
        busType,
      },
    });
    res.json(newBus);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: 'Something went wrong' });
  }
};
