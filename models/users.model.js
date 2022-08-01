const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// create schema
const userSchema = new Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  phone: { type: String },
});

// create collection
const Users = mongoose.model("Users", userSchema);

// create new user
const insertUser = (firstName, lastName, email, password, phone) => {
  const user = new Users({
    firstName,
    lastName,
    email,
    password,
    phone,
  });
  return user.save();
};

module.exports = { insertUser };
