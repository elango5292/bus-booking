const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const prisma = new PrismaClient();

exports.signup = async (req, res) => {
  const { email, password } = req.body;
  const hashedPassword = await bcrypt.hash(password, 10);
  const user = await prisma.user.create({ data: { email, password: hashedPassword } });
  res.send(user);
};

exports.login = async (req, res) => {
  const { email, password } = req.body;
  const user = await prisma.user.findUnique({ where: { email } });
  if (!user) return res.status(404).send('User not found');
  const valid = await bcrypt.compare(password, user.password);
  if (!valid) return res.status(400).send('Invalid password');
  const token = jwt.sign({ userId: user.id }, '43536373839303');
  res.cookie('authToken', token, {httpOnly: true, sameSite: 'lax', path: '/'});
  res.send('Logged in');
};


exports.getTickets = async (req, res) => {
  const { userId } = req.user;
  const tickets = await prisma.ticket.findMany({ where: { userId } });
  res.send(tickets);
};

exports.me = async (req, res) => {
    const { userId } = req.user;
    const user = await prisma.user.findUnique({ where: { id: userId } });
    if (!user) return res.status(404).send('User not found');
    res.send(user);
  };
  