const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    username: { type: String, required: true },
    password: { type: String, required: true },
    created_at: { type: Date, default: Date.now }
});

// Do not declare statics using ES6 arrow functions (=>). Arrow functions explicitly prevent binding this
// reference: https://mongoosejs.com/docs/guide.html#statics
userSchema.statics.findOneByUserName = function findOneByUserName(username) {
    return this.findOne({ username });
};

module.exports = mongoose.model('User', userSchema);
