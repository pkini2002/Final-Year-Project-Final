const bcrypt = require('bcrypt');
const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema ({
    name: {type: String, required: true},
    surname: {type: String, required: true},
    email_id: {type: String, required: true, unique:true},
    marks: {type: String, required: true},
    gender: {type: String, required: true },
    rank:{type:Number,required: true},
    password: {type: String, required: true},
    application_number: {type:String,required: true},
    preference1: { type: String, default: 'No Preference' },
  preference2: { type: String, default: 'No Preference' },
  preference3: { type: String, default: 'No Preference' },
  allocation: { type: String, default: null },
});

module.exports = mongoose.model('allotments', UserSchema);