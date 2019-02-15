const bcrypt = require('bcrypt');
const mongoose =  require('mongoose');
const schema = mongoose.Schema();

const userSchema = new schema({
    userName : {type : String, 
                min: [4, 'Too short, min charecter is 4'], 
                max: [ 32 , 'Too long, Max charecter is 32']
    },
    email : {  type: String, 
                min:[4, 'To short, min 4 characters'],  
                max:[ 32, 'To long, max charecter is 128'],
                unique : true,
                required: 'Email is required', 
                lowercase:true,  
                //match: [/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/]
    },
    password : {type : String,
                required: 'password is required',
                min:[ 4 , 'Too short, min charecter is 4'],
                min:[ 32 , 'Too long, Max charecter is 32']
    }
  //  rentals : [{type: schema.Types.ObjectId, ref: 'Rental'}]

});

userSchema.pre('save', function ( next ) {
    const user = this;
    bcrypt.genSalt(10, function(err, salt) {
        bcrypt.hash(user.password, salt, function(err, hash) {
            // Store hash in your password DB.
            user.password = hash;
            next();
        });
    });
})
module.exports = userSchema('User', userSchema);