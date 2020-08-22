const mongoose = require('mongoose');

const bestTimeSchema = new mongoose.Schema({
    _id: false,
    minutes: { type: Number, require: true },
    seconds: { type: Number, require: true },
    milliseconds: { type: Number, require: true },
});

const levelSchema = new mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    level: { type: Number, require: true },
    bestMoves: { type: Number, require: true },
    bestTime: bestTimeSchema,
    userName: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
});

module.exports = mongoose.model('Level', levelSchema);
