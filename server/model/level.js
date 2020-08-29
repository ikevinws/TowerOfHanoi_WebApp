const mongoose = require('mongoose');
const { Decimal128 } = require('mongoose');

const levelSchema = new mongoose.Schema({
    level: { type: Number, require: true },
    bestMoves: { type: Number, require: true },
    bestTime: { type: Decimal128, require: true },
    username: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }
});

module.exports = mongoose.model('Level', levelSchema);
