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
    application_number: {type:String,required: true}
});

const predefinedUsers = [
  {
    name: "Siri",
    surname: "Shetty",
    email_id: "siri00@gmail.com",
    marks: "100",
    gender: "F",
    rank: "800",
    password: "siri",
    application_number: "NU202401"
  }
];
const UserModel = mongoose.model("users_final", UserSchema,"users_final");

// Hash passwords for predefined users
Promise.all(predefinedUsers.map(user => {
  return new Promise((resolve, reject) => {
      bcrypt.hash(user.password, 10, (err, hashedPassword) => {
          if (err) {
              console.error(`Error hashing password for ${user.name}:`, err);
              reject(err);
          } else {
              user.password = hashedPassword;
              console.log(user.password+"---"+hashedPassword);
              resolve();
          }
      });
  });
}))
.then(() => {
  // Insert predefined users into the users_final collection
  UserModel.insertMany(predefinedUsers)
      .then(() => {
          console.log("Predefined users inserted successfully");
      })
      .catch(err => {
          console.error("Error inserting predefined users:", err);
      });
})
.catch(err => {
  console.error("Error hashing passwords for predefined users:", err);
});

module.exports = {
  UserModel
};