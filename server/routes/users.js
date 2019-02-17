const express = require('express');
const router = express.Router();
const User = require("../controller/user");

router.post('/auth',User.auth);
router.post('/register', User.register);

module.exports = router;
