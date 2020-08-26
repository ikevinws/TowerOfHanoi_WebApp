const express = require('express');
const { addUser, loginUser } = require('../controller/User');

const router = express.Router();
router.post('/addUser', addUser);
router.post('/login', loginUser);

module.exports = router;
