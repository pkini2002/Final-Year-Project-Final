// models/Student.js
const mongoose = require('mongoose');

const studentSchema = new mongoose.Schema({
    name: String,
    surname: String,
    email_id: String,
    marks: Number,
    gender: String,
    rank: Number,
    application_number: String,
  preference1: String,
  preference2: String,
  preference3: String,
  allocation: { type: String, default: null },
});

const Student = mongoose.model('allotments', studentSchema);

module.exports = Student;
