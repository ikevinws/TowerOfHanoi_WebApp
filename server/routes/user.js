const express = require('express');
const { addUser, signInUser } = require('../controller/user');

const router = express.Router();

router.post('/signup', addUser);
router.post('/signin', signInUser);

module.exports = router;
