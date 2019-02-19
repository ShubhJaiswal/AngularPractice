const mongoose = require('mongoose');
const shcema = mongoose.schema();
const bookingSchema = new shcema({

    endAt: { type: Date, require: 'ending date is required'},
    startAt: { type: Date, required: 'starting date is required'},
    totalPrice: Number,
    days: Number,
    guests: Number,
    createdAt: { type : Date, default: Date.now},
    user: { type: shcema.type.ObjectId, ref : 'User'},
    rental: { type: shcema.type.ObjectId, ref : 'Rental'}

});

module.exports = mongoose.model('Booking', bookingSchema);
