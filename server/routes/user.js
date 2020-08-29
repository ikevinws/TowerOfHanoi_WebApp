const express = require('express');
const { addUser, signInUser, signOutUser } = require('../controller/user');
const checkAuth = require('../middleware/auth');

const router = express.Router();

router.post('/signup', checkAuth, addUser);
router.post('/signin', signInUser);
router.get('/signout', signOutUser);
module.exports = router;
