const Level = require('../model/level');

// get all levels
exports.getLevels = async (req, res) => {
    try {
        // find all levels and join username
        const levels = await Level.find().populate('username', '-_id username');
        // extract decimals and replace username object with just the username string
        const convertedLevels = levels.map((level) => {
            const convertedLevel = {
                ...level.toObject(),
                bestTime: parseFloat(level.bestTime),
                username: level.username.username
            };
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
        if (req.isAuthenticated()) {
            const { level, moves, time } = req.body;
            const usernameId = req.user._id;
            // find level data in database with usernameId and level
            const filter = { level, username: usernameId };
            const prevLevelData = await Level.findOne(filter);
            if (prevLevelData != null) {
                // if level exists compare and update best times
                if (prevLevelData.bestTime >= time) {
                    const update = {};
                    // update bestMoves if moves are lower
                    if (prevLevelData.bestMoves > moves) {
                        update.bestMoves = moves;
                    }
                    update.bestTime = time;
                    const idFilter = { _id: prevLevelData._id };
                    await Level.updateOne(idFilter, update);
                }
            } else {
                // if level data does not exists, add new level data
                const levelData = new Level({
                    level,
                    bestMoves: moves,
                    bestTime: time,
                    username: usernameId
                });
                await levelData.save();
            }
            res.status(201).send();
        }
        // do nothing if unauthenticated
    } catch (err) {
        res.status(500).send();
    }
};
