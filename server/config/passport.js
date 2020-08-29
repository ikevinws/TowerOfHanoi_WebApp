const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcrypt');
const User = require('../model/user');

const PassportConfig = (passport) => {
    const validPassword = async (password, user) => {
        if (await bcrypt.compare(password, user.password)) {
            return true;
        }
        return false;
    };

    const verifyCB = async (username, password, done) => {
        try {
            const user = await User.findOneByUserName(username);
            if (!user) {
                return done(null, false, { message: 'Incorrect username.' });
            }
            if (!validPassword(password, user)) {
                return done(null, false, { message: 'Incorrect password.' });
            }
            return done(null, user);
        } catch (err) {
            return done(err);
        }
    };

    const localStrategy = new LocalStrategy(verifyCB);

    passport.use(localStrategy);

    passport.serializeUser((user, done) => {
        done(null, user.id);
    });
    passport.deserializeUser(async (userId, done) => {
        try {
            const user = await User.findById(userId);
            if (user) {
                done(null, user);
            }
        } catch (err) {
            done(err);
        }
    });
};
module.exports = PassportConfig;
