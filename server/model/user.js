const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    username: { type: String, required: true },
    password: { type: String, required: true },
    created_at: { type: Date, default: Date.now }
});

userSchema.statics.findOneByUserName = function findOneByUserName(username) {
    return this.findOne({ username });
};

module.exports = mongoose.model('User', userSchema);
