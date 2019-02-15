const User =  require('../models/user')

exports.auth =  function (req, res) {
    
}


exports.register =  function (req, res) {
    // const username = req.body.Username;    
    // const  email = req.body.email;    
    // const password = req.body.password;    
    // const passwordConfirmation = req.body.passwordConfirmation;





    
     const { username, email, password, passwordConfirmation } = req.body;
    
    
     if(!email || !password){
         return res.status(422).send({errors : [{title : 'Data missing!', detail: 'Provide email and password!'}]})
     }
    if(password !== passwordConfirmation){
        return res.status(422).send({errors : [{title : 'invalid password', detail : 'Password is not as a Confirmation Password!'}]});
    }
    // User.findOne({email: email}, function(err, existingUser){
    //     if(err){
    //         return res.status(422).send({'mongoose': 'handle mongoose err in next lecture'});
    //     }
    //     if(existingUser){
    //         return res.status(422).send({errors : [{title : 'invalid email', detail : 'user with this email already exist!'}]});
    //     }      

    //     const user = new User({
    //         username,
    //         email,
    //         password
    //     });

    //     // user.save(function(err){
    //     //     if(err){
    //     //         return res.status(422).send({'mongoose': 'handle mongoose err in next lecture'});
    //     //     }
    //     //     return  res.json({'registed' : true});
    //     // });
    // })


    res.json({username,email});
}