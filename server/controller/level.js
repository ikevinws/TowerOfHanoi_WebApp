const Level = require('../model/level');

// get all levels
exports.getLevels = async (req, res) => {
    try {
        const levels = await Level.find();
        // extract decimals
        const convertedLevels = levels.map((level) => {
            const convertedLevel = { ...level.toObject(), bestTime: parseFloat(level.bestTime) };
            return convertedLevel;
        });
        res.status(200).json({
            levels: convertedLevels
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
            res.status(400).json({ msg: 'Cannot find level.' });
        }
    } catch {
        res.status(500).send();
    }
};

// create level
exports.addLevel = async (req, res) => {
    try {
        const { level, moves, time } = req.body;
        const usernameId = req.user._id;
        // find level in database based on number of moves made by player
        const filter = { level, username: usernameId, bestMoves: moves };
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
                level,
                bestMoves: moves,
                bestTime: time,
                username: usernameId
            });
            await levelData.save();
        }
        res.status(201).send();
    } catch (err) {
        res.status(500).send();
    }
};
