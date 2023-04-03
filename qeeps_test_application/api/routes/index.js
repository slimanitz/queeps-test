const express = require('express');
const asset = require('./asset');
const agency = require('./agency');
const user = require('./user');
// __IMPORT__

const router = express.Router();
router.use('/agencies', agency);
router.use('/assets', asset);
router.use('/users', user);
// __ROUTE__

module.exports = router;
