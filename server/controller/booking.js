const Booking = require('../models/booking');
const Rental = require('../models/rental');
const { normalizeErrors } = require('../helpers/mongoose');

exports.createBooking = function(req, res) {
  const { startAt, endAt, totalPrice, guests, days, rental} = req.body;
  const user = res.locals.user;

  const booking = new booking({ startAt, endAt, totalPrice, guests, days});

  Rental.findById(rental._id)
        .populate('bookings')
        .populate('user')
        .exec(function(err, foundRental){

     if(err){
      return res.status(422).send({ errors: normalizeErrors(err.errors) });
     }
     if(foundRental.user.id === user.id){
      return res.status(422).send({ errors: [{ title: 'invalid User', detail: 'Can not create booking on your Rental!' }] });
     }

     //check here for valid booking
     return res.json({booking, foundRental});
  })

//  res.json({"createBooking":"ok"});
};
