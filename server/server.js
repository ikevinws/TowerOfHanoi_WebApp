if (process.env.NODE_ENV !== 'production') {
    // eslint-disable-next-line global-require,  import/no-extraneous-dependencies
    const dotenv = require('dotenv');
    dotenv.config();
}
const PORT = process.env.PORT || 5000;
const { DATABASE_URL } = process.env;

const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const mongoose = require('mongoose');
const path = require('path');

const levelRouter = require('./routes/level');

mongoose.connect(DATABASE_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
});
const db = mongoose.connection;
db.on('error', (error) => console.error(error));
db.once('open', () => console.log('Connected to Mongoose'));

const app = express();
app.use(cors());
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use('/api/level', levelRouter);

// Serve any static files
app.use(express.static(path.join(__dirname, '../client/build')));
// Handle React routing, return all requests to React app
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../client/build', 'index.html'));
});
app.listen(PORT);
