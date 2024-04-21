const express = require("express");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const cookieParser = require('cookie-parser');
const ticketRoutes = require('./route/routes');
const cors = require('cors'); 

const app = express();
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const corsOptions = {
  origin: true, 
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'], 
  allowedHeaders: ['Content-Type', 'Authorization'],
  optionsSuccessStatus: 200 
};

app.use(cors(corsOptions));


app.use(express.json());
app.use(cookieParser());

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.get("/test", (req, res) => {
  res.send("test");
});

app.use('/api', ticketRoutes);

const port = 3001;

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});

export default app;
