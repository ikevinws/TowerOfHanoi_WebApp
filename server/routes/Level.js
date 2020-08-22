const express = require('express');
const { getLevels } = require('../controller/Level');

const router = express.Router();
router.get('/', getLevels);
// router.get('/:id', getLevelById);
// router.post('/addLevel', addLevel);

module.exports = router;
