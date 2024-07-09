// Import necessary modules
const express = require('express');
const router = express.Router();
const AllotedSeats = require('../models/allotmentUsers.cjs'); 

router.get('/studentallotment', async (req, res) => {
    try {
        // Retrieve alloted seats data from the database
        const result = await AllotedSeats.find();
        res.json(result); 
    } catch (error) {
        console.error('Error fetching seat matrix data:', error);
        res.status(500).json({ error: 'Internal server error' }); // Send error response if there's an issue
    }
});

module.exports = router;
