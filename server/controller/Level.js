const Level = require('../model/Level');

// get all levels
exports.getLevels = async (req, res) => {
    try {
        const levels = await Level.find();
        res.status(200).json({
            levels,
        });
    } catch {
        res.status(500).send();
    }
};

// exports.getLevelById = async (req, res) => {};
