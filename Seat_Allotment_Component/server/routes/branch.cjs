const express = require('express');
const Course = require('../models/Course.cjs'); // Adjust the path as necessary
const Sahilrouter = express.Router();

Sahilrouter.post('/seats/return', async (req, res) => {
   
  try {
    const { branchName } = req.body;
    const updatedCourse = await Course.findOneAndUpdate(
      { branch: branchName },
      { $inc: { seats: 1 } },
      { new: true }
    );

    if (updatedCourse) {
      res.send('Seat returned successfully');
      console.log("seat returned");
    } else {
     
      res.status(404).send('Branch not found');
    }
  } catch (error) {
    console.error(error);
    res.status(500).send('Error returning seat');
  }
});

module.exports = Sahilrouter;
