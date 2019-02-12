const mongoose = require('mongoose');
const schema = mongoose.Schema;

    
const rentalSchema = new schema({

    title : { type: String, required:true, max:[128, 'To long, max charecter is 128']},
    city : { type: String, required:true, lowercase:true },
    street : {type: String, required: true, min:[4, 'To short, min 4 characters']},
    category : { type: String, required: true, lowercase: true },
    image : { type: String, required: true},
    bedrooms :Number,
    shared : Boolean,
    description : { type: String, required: true},
    dailyRate : Number,
    createdAt : { type: Date, default : Date.now }
    
});

module.exports = mongoose.model('Rental', rentalSchema);

