const express = require('express');
const { getLevels, addLevel, getLevelById } = require('../controller/level');

const router = express.Router();
router.get('/', getLevels);
router.get('/:id', getLevelById);
router.post('/addLevel', addLevel);

module.exports = router;
