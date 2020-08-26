const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const User = require('../model/User');

function getUserByName(username) {
    return User.findOne({ name: username });
}

exports.addUser = async (req, res) => {
    const { username, password } = req.body;
    try {
        const existingUser = await getUserByName(username);
        // if user name already exists in database return error
        if (existingUser) {
            res.status(409).send();
        } else {
            // create new user
            const hashedPassword = await bcrypt.hash(password, 10);
            const newUser = new User({
                _id: mongoose.Types.ObjectId(),
                name: username,
                password: hashedPassword
            });
            await newUser.save();
            res.status(201).send();
        }
    } catch {
        res.status(500).send();
    }
};

exports.loginUser = async (req, res) => {
    const { username, password } = req.body;
    try {
        const existingUser = await getUserByName(username);
        if (existingUser) {
            if (await bcrypt.compare(password, existingUser.password)) {
                res.send('success');
            } else {
                res.send('not allowed');
            }
        } else {
            res.status(400).send('Cannot find user');
        }
    } catch {
        res.status(500).send();
    }
};
