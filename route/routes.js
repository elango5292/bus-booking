const express = require('express');
const jwt = require('jsonwebtoken');
const router = express.Router();
const busController = require('../controllers/busController.js');
const tripController = require('../controllers/tripController');

const userController = require('../controllers/userController');
const ticketController = require('../controllers/ticketController');

const authenticate = (req, res, next) => {
  const token = req.cookies.authToken;
  if (!token) return res.status(403).send('Not authenticated');
  try {
    const payload = jwt.verify(token, '43536373839303');
    req.user = payload;
    next();
  } catch (e) {
    console.log(e)
    res.status(403).send('Invalid token');
  }
};

router.post('/createBus', busController.createBus);
router.post('/createTrip', tripController.createTrip);

router.post('/signup', userController.signup);
router.post('/login', userController.login);

router.get('/me', authenticate, userController.me); 

router.get('/tickets', authenticate, ticketController.getTickets);
router.post('/book', authenticate, ticketController.bookTicket);

router.post('/cancel', authenticate, ticketController.cancelTicket);
router.post('/updateSeat', authenticate, ticketController.updateSeats);
router.get('/trips', tripController.getTripsByDate);
router.post('/trip', tripController.getTripById);


module.exports = router;
