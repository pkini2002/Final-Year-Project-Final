// models/Course.js
const mongoose = require('mongoose');

const courseSchema = new mongoose.Schema({
  branch: String,
  seats: Number,
});

const Course = mongoose.model('seats', courseSchema);

module.exports = Course;
