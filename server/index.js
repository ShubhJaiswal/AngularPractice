//const Rental = require('./models/rental');
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt');
const config = require('./config/dev');
const FakeDb = require('./fake-db');

const rentalRoutes = require('./routes/rentals'), userRoutes = require('./routes/users');

mongoose.connect(config.DB_URI).then( () => {
    const fakDb = new FakeDb();
    //fakDb.seedDb(); // do not need to push changes on the database again and again
});

const app = express();
app.use(bodyParser.json());
app.use('/api/v1/rentals', rentalRoutes);
app.use('/api/v1/users', userRoutes);
// app.get('/rentals',function(req,res){
//     res.json({'success': true});
// })
const PORT = process.env.PORT || 3001
app.listen(PORT, function() {
        console.log('I am running');
});
