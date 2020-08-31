const express = require('express');
const { getLevels, addLevel, getLevelById } = require('../controller/level');
const { checkAuth } = require('../middleware/auth');

const router = express.Router();
router.get('/', getLevels);
router.get('/:id', getLevelById);
router.post('/addLevel', checkAuth, addLevel);

module.exports = router;
