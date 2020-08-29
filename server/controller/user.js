const bcrypt = require('bcrypt');
const User = require('../model/user');

/**
 * Check for signup fields for errors and add errors msg to errorArr
 * @param {strings} username
 * @param {string} password
 * @param {string} confirmedPassword
 * @param {array} errorArr
 * @return {void}
 */
const ValidateSignUpFields = (username, password, confirmedPassword, errorArr) => {
    if (!username || !password) {
        errorArr.push({ msg: 'Not all fields have been entered.' });
    }
    if (password !== confirmedPassword) {
        errorArr.push({ msg: 'Passwords do not match.' });
    }
    if (password.length < 6) {
        errorArr.push({ msg: 'The password needs to be at least 6 characters long.' });
    }
};

exports.addUser = async (req, res) => {
    const { username, password, confirmedPassword } = req.body;
    const errors = [];
    ValidateSignUpFields(username, password, confirmedPassword, errors);
    if (errors.length > 0) {
        res.status(400).json({ errors });
    } else {
        try {
            const existingUser = await User.findOneByUserName(username);
            if (existingUser) {
                // if user name already exists send error
                errors.push({ msg: 'Username already exists.' });
                res.status(409).json({ errors });
            } else {
                // create new user with hashed password
                const hashedPassword = await bcrypt.hash(password, 10);
                const newUser = new User({
                    username,
                    password: hashedPassword
                });
                await newUser.save();
                res.status(201).send();
            }
        } catch (err) {
            console.log(err);
            res.status(500).send();
        }
    }
};

// exports.signInUser = async (req, res) => {
//     const { username, password } = req.body;
//     const errors = [];
//     try {
//         const existingUser = await User.findOneByUserName(username);
//         if (existingUser && (await bcrypt.compare(password, existingUser.password))) {
//             res.send('Suceess');
//         } else {
//             errors.push({ msg: 'The username or password is incorrect.' });
//             res.status(400).json({ errors });
//         }
//     } catch (err) {
//         console.log(err);
//         res.status(500).send();
//     }
// };

exports.signOutUser = async (req, res) => {
    req.logout();
    res.redirect('/signin');
};
