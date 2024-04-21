const express = require("express");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const cookieParser = require('cookie-parser');
const ticketRoutes = require('./route/routes');
const cors = require('cors'); 

const app = express();
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const allowedOrigins = ['http://localhost:3000', 'https://bos-dusky.vercel.app'];

app.use(
  cors({
    origin: (origin, callback) => {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error('Not allowed by CORS'));
      }
    },
    credentials: true,
  })
);


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
