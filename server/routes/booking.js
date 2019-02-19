const express = require('express');
const router = express.Router();
const UserCntrl =  require('../controller/user');
const BookingCntrl = require('../controller/booking');


router.post('', UserCntrl.authMiddleware, BookingCntrl.createBooking);

module.exports = router;
