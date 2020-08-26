const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    name: { type: String, required: true },
    password: { type: String, required: true },
    created_at: { type: Date, default: Date.now }
});

module.exports = mongoose.model('User', userSchema);
