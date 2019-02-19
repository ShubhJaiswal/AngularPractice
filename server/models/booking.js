const mongoose = require('mongoose');
const schema = mongoose.Schema;

const bookingSchema = new schema({

    endAt: { type: Date, require: 'ending date is required'},
    startAt: { type: Date, required: 'starting date is required'},
    totalPrice: Number,
    days: Number,
    guests: Number,
    createdAt: { type : Date, default: Date.now},
    user: { type : schema.Types.ObjectId, ref : 'User'},
    rental: { type: schema.Types.ObjectId, ref : 'Rental'}

});

module.exports = mongoose.model('Booking', bookingSchema);
