const express = require('express');
const router = express.Router();

const { registerRules, loginRules } = require('./validation');
const { registerUser, loginUser } = require('./controller');

router.post('/register', registerRules, registerUser);

router.post('/login', loginRules, loginUser);

module.exports = router;