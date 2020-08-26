const mongoose = require('mongoose');
const Level = require('../model/Level');

// get all levels
exports.getLevels = async (req, res) => {
    try {
        const levels = await Level.find();
        res.status(200).json({
            levels
        });
    } catch {
        res.status(500).send();
    }
};

// get level by id
exports.getLevelById = async (req, res) => {
    try {
        const level = await Level.findById(req.params.id);
        if (level) {
            const levelData = {
                ...level.toObject(),
                bestTime: parseFloat(level.bestTime)
            };
            res.status(200).json(levelData);
        } else {
            res.status(400).send('Cannot find level');
        }
    } catch {
        res.status(500).send();
    }
};

// create level
exports.addLevel = async (req, res) => {
    try {
        const { level, userNameId, moves, time } = req.body;

        // find level in database based on number of moves made by player
        const filter = { level, userName: userNameId, bestMoves: moves };
        const prevLevelData = await Level.findOne(filter);
        if (prevLevelData != null) {
            // if level based on number of moves exists, compare and update best times
            if (prevLevelData.bestTime > time) {
                const update = { bestTime: time };
                const idFilter = { _id: prevLevelData._id };
                await Level.updateOne(idFilter, update);
            }
        } else {
            // if level based on number of moves doesnt exists, add new level data
            const levelData = new Level({
                _id: mongoose.Types.ObjectId(),
                level,
                bestMoves: moves,
                bestTime: time,
                userName: userNameId
            });
            await levelData.save();
        }
        res.status(201).send();
    } catch (err) {
        res.status(500).send();
    }
};
