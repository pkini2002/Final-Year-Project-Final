const User = require('../models/allotmentUsers.cjs'); // Adjust the path as necessary

exports.saveUserPreferences = async (req, res) => {
  try {
    console.log("Received preferences submission:", req.body);
    // Use application_number as the unique identifier for finding or creating the document
    const uniqueIdentifier = { application_number: req.body.application_number };

    // Prepare the data for update or insertion
    // Explicitly set `allocation` to null if it's not present in the request body
    const updateData = {
      ...req.body,
      marks: parseInt(req.body.marks, 10),
      rank: parseInt(req.body.rank, 10),
      allocation: req.body.allocation ? req.body.allocation : null,
    };

    // The options object with upsert set to true - this will create a new document if one doesn't exist
    const options = { upsert: true, new: true, runValidators: true };

    // Use findOneAndUpdate to either update an existing document or insert a new one
    const result = await User.findOneAndUpdate(uniqueIdentifier, updateData, options);

    console.log("User data saved or updated:", result);
    res.status(201).send('User data saved or updated');
  } catch (error) {
    console.error(error);
    res.status(400).send(error.message);
  }
};
