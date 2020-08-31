const express = require('express');
const { addUser, signInUser, signOutUser, checkUserAuth } = require('../controller/user');

const router = express.Router();

router.post('/signup', addUser);
router.post('/signin', signInUser);
router.get('/signout', signOutUser);
router.get('/checkAuth', checkUserAuth);
module.exports = router;
