const User = require('../models/user')
const jwt = require('jsonwebtoken');
const config = require('../config/dev');
//const MongooseHelpers = require('../helpers/mongoose');
const { normalizeErrors } = require('../helpers/mongoose');
exports.auth = function (req, res) {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(422).send({ errors: [{ title: 'Data missing!', detail: 'Provide email and password!' }] })
  }
  User.findOne({ email }, function (err, user) {
    if (err) {
      return res.status(422).send({ errors: normalizeErrors(err.errors) });
    }
    if (!user) {
      return res.status(422).send({ errors: [{ title: 'Invalid User!', detail: 'User does not exist' }] })
    }
    if (user.hasSamePassword(password)) {
      debugger
      //return jwt token.

      const token = jwt.sign({ userId: user.id,
        username: user.username },
        config.SECRET, { expiresIn: '1h'});
      return res.json(token);
    } else {
      return res.status(422).send({ errors: [{ title: 'Wrong Data!', detail: 'Wrong email and password!' }] })
    }

  });

}
exports.register = function (req, res) {
  // const username = req.body.Username;
  // const  email = req.body.email;
  // const password = req.body.password;
  // const passwordConfirmation = req.body.passwordConfirmation;
  const { username, email, password, passwordConfirmation } = req.body;


  if (!email || !password) {
    return res.status(422).send({ errors: [{ title: 'Data missing!', detail: 'Provide email and password!' }] })
  }
  if (password !== passwordConfirmation) {
    return res.status(422).send({ errors: [{ title: 'invalid password', detail: 'Password is not as a Confirmation Password!' }] });
  }
  User.findOne({ email: email }, function (err, existingUser) {
    if (err) {
      return res.status(422).send({ errors: normalizeErrors(err.errors) });
    }
    if (existingUser) {
      return res.status(422).send({ errors: [{ title: 'invalid email', detail: 'user with this email already exist!' }] });
    }

    const user = new User({
      username,
      email,
      password
    });

    user.save(function (err) {
      if (err) {
        //  return res.status(422).send({errors: MongooseHelpers.normalizeErrors(err.errors)});
        return res.status(422).send({ errors: normalizeErrors(err.errors) });

      }
      return res.json({ 'registed': true });
    });
  });
  // res.json({username,email});
}

exports.authMiddleware = function (req, res, next) {
  const token = req.header.authorization;
  if (token) {
    const user = parseToken(token);

    User.findById(user.userId, function (err, user) {
      if (err) {
        return res.status(422).send({ errors: normalizeErrors(err.errors) });
      }
      if (user) {
        res.locals.user = user;
        next();
      } else {
        return notAuthorized(res);
      }
    })
  } else {
    return notAuthorized(res);
  }

}

function parseToken(token) {
  return jwt.verify(token.split(' ')[1], config.SECRET);
}

function notAuthorized(res) {
  return res.status(401).send({ errors: [{ title: 'Not authorized', detail: 'You need to login to get access!' }] });
}























// const User =  require('../models/user')

// exports.auth =  function (req, res) {

// }


// exports.register =  function (req, res) {
//     // const username = req.body.Username;
//     // const  email = req.body.email;
//     // const password = req.body.password;
//     // const passwordConfirmation = req.body.passwordConfirmation;






//      const { username, email, password, passwordConfirmation } = req.body;


//      if(!email || !password){
//          return res.status(422).send({errors : [{title : 'Data missing!', detail: 'Provide email and password!'}]})
//      }
//     if(password !== passwordConfirmation){
//         return res.status(422).send({errors : [{title : 'invalid password', detail : 'Password is not as a Confirmation Password!'}]});
//     }
//     // User.findOne({email: email}, function(err, existingUser){
//     //     if(err){
//     //         return res.status(422).send({'mongoose': 'handle mongoose err in next lecture'});
//     //     }
//     //     if(existingUser){
//     //         return res.status(422).send({errors : [{title : 'invalid email', detail : 'user with this email already exist!'}]});
//     //     }

//     //     const user = new User({
//     //         username,
//     //         email,
//     //         password
//     //     });

//     //     // user.save(function(err){
//     //     //     if(err){
//     //     //         return res.status(422).send({'mongoose': 'handle mongoose err in next lecture'});
//     //     //     }
//     //     //     return  res.json({'registed' : true});
//     //     // });
//     // })


//     res.json({username,email});
// }
