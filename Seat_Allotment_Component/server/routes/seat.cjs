// Import necessary modules
const express = require('express');
const router = express.Router();
const SeatMatrix = require('../models/Course.cjs'); 
// Define route handler for /api/seatmatrix endpoint
router.get('/seatmatrix', async (req, res) => {
    try {
        // Retrieve seat matrix data from the database
        const seatMatrix = await SeatMatrix.find();
        res.json(seatMatrix); // Send seat matrix data as JSON response
    } catch (error) {
        console.error('Error fetching seat matrix data:', error);
        res.status(500).json({ error: 'Internal server error' }); // Send error response if there's an issue
    }
});

module.exports = router;
