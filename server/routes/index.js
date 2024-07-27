const express = require('express');

const router = express.Router();

router.use(require('./invoice'));

module.exports = router;