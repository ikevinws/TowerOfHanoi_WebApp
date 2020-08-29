const IN_PROD = process.env.NODE_ENV === 'production';
if (!IN_PROD) {
    // eslint-disable-next-line global-require,  import/no-extraneous-dependencies
    const dotenv = require('dotenv');
    dotenv.config();
}

// imports
const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const mongoose = require('mongoose');
const path = require('path');
const session = require('express-session');
const MongoStore = require('connect-mongo')(session);
const passport = require('passport');
const PassportConfig = require('./config/passport');
// configure passport
PassportConfig(passport);

// env
const { DATABASE_URL, SESSION_SECRET } = process.env;
const PORT = process.env.PORT || 5000;

// routers
const levelRouter = require('./routes/level');
const userRouter = require('./routes/user');

// database
mongoose.connect(DATABASE_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true
});
const db = mongoose.connection;
db.on('error', (error) => console.error(error));
db.once('open', () => console.log('Connected to Mongoose'));

const sessionStore = new MongoStore({
    mongooseConnection: db,
    collection: 'sessions'
});
const app = express();
// middleware
app.use(cors({ credentials: true }));
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(
    session({
        secret: SESSION_SECRET,
        resave: false,
        saveUninitialized: false,
        store: sessionStore,
        cookie: {
            maxAge: 24 * 60 * 60 * 1000, // max age = 1 day (1day * 24hr/1day * 60 min/1hr * 60sec/1min * 1000ms/1sec)
            secure: IN_PROD
        }
    })
);
app.use(passport.initialize());
app.use(passport.session());

app.use((req, res, next) => {
    console.log(req.session);
    console.log(req.user);
    next();
});

app.use('/api/level', levelRouter);
app.use('/api/user', userRouter);

// Serve any static files
app.use(express.static(path.join(__dirname, '../client/build')));
// Handle React routing, return all requests to React app
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../client/build', 'index.html'));
});
app.listen(PORT);
