const express = require('express');
const passport = require('passport');
const { addUser, signOutUser } = require('../controller/user');
const checkAuth = require('../middleware/auth');

const router = express.Router();

router.post('/signup', checkAuth, addUser);
router.post(
    '/signin',
    checkAuth,
    passport.authenticate('local', { successRedirect: 'home', failureRedirect: '/signin' })
);
router.get('/signout', signOutUser);
module.exports = router;
