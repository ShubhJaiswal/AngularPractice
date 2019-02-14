//const Rental = require('./models/rental');
const express = require('express');
const mongoose = require('mongoose');
const config = require('./config/dev');
const FakeDb = require('./fake-db');

const rentalRoutes = require('./routes/rentals');

mongoose.connect(config.DB_URI).then( () => {
    const fakDb = new FakeDb();
    fakDb.seedDb();
});

const app = express();
app.use('/api/v1/rentals', rentalRoutes);
// app.get('/rentals',function(req,res){
//     res.json({'success': true});
// })
const PORT = process.env.PORT || 3001;
app.listen(PORT, function() {
        console.log('I am running');
});