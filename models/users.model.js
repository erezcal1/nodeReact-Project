const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// create schema
const userSchema = new Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  phone: { type: String },
  recovery: {
    secretKey: { type: String },
    dateRecovery: { type: Date },
  },
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

const updateRecovery = (email, key, date) => {
  return Users.updateOne(
    { email },
    { "recovery.secretKey": key, "recovery.dateRecovery": date }
  );
};

const selectUserByEmail = (email) => {
  return Users.find({ email });
};

module.exports = { insertUser, selectUserByEmail, updateRecovery };
