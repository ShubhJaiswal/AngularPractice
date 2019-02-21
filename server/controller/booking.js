const Booking = require('../models/booking');
const Rental = require('../models/rental');
const { normalizeErrors } = require('../helpers/mongoose');
const moment = require('moment');

exports.createBooking = function(req, res) { debugger
  // console.log(req);
  const { startAt, endAt, totalPrice, guests, days, rental} = req.body;
  const user = res.locals.user;

  const booking = new Booking({ startAt, endAt, totalPrice, guests, days});
  
  Rental.findById("5c6beaf939454408bd6949c5")
        .populate('bookings')
        .populate('user')
        .exec(function(err, foundRental){

     if(err){
      return res.status(422).send({ errors: normalizeErrors(err.errors) });
     }
     if(foundRental.user.id === user.id){
      return res.status(422).send({ errors: [{ title: 'invalid User', detail: 'Can not create booking on your Rental!' }] });
     }

     if(isValidBooking(booking, foundRental)){
       foundRental.bookings.push(booking);
       foundRental.save();
       booking.save();
       //update rental , uodate user;

       return res.json({'created': true});  
     }else{
       return res.status(422).send({errors: [{title: 'Invalid Booking', detail:'Choosen dates are already taken!'}]});
     }

     //check here for valid booking
     //return res.json({booking, foundRental});
  })

  function isValidBooking(proposedBooking, rental){
    let isValid = true;

    if(rental.bookings && rental.bookings.length > 0){
     isValid = rental.bookings.every(function(booking){
        const proposedStart = moment(proposedBooking.startAt);
        const proposedEnd = moment(proposedBooking.endAt);
        const actualStart = moment(booking.startAt);
        const actualEnd = moment(booking.endAt);
        return ((actualStart<proposedStart  && actualEnd < actualStart) || (proposedEnd < actualEnd && proposedEnd < actualStart));
        // if((actualStart<proposedStart  && actualEnd < actualStart) || (proposedEnd < actualEnd && proposedEnd < actualStart)){
        //   return true;
        // }else{
        //   return false;
        // }
      })
    }


    return isValid;
  }

//  res.json({"createBooking":"ok"});
};
