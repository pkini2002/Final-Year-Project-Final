const express = require('express');
const router = express.Router();
const { saveUserPreferences } = require('../models/preferenceController.cjs');

router.post('/submit-preferences', saveUserPreferences);

module.exports = router;
