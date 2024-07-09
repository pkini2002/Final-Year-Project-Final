// routes/allocationRoutes.js
const express = require('express');
const router = express.Router();
const allocationController = require('../models/allocationContoller.cjs');

router.post('/run-allocation', allocationController.allocateSeats);

module.exports = router;
