const express = require('express');
const { getLevels } = require('../controller/level');

const router = express.Router();
router.get('/', getLevels);
// router.get('/:id', getLevelById);
// router.post('/addLevel', addLevel);

module.exports = router;
