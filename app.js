const express = require("express");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const cookieParser = require('cookie-parser');
const ticketRoutes = require('./route/routes');
const cors = require('cors'); 

const app = express();
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

app.use(cors({
  origin: 'http://localhost:3000', 
  credentials: true,  
}));

app.use(express.json());
app.use(cookieParser());

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.use('/api', ticketRoutes);

const port = 3001;

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});

module.exports = app;
