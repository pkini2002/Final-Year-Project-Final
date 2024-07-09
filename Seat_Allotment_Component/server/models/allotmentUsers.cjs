const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: String,
  surname: String,
  email_id: String,
  marks: Number,
  gender: String,
  rank: Number,
  application_number: String,
  password: String,
  preference1: { type: String, default: 'No Preference' },
  preference2: { type: String, default: 'No Preference' },
  preference3: { type: String, default: 'No Preference' },
  allocation: { type: String, default: null },
  // other fields as necessary
});

module.exports = mongoose.model('allotment', userSchema);
