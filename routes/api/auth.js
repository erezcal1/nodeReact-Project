const express = require("express");
const router = express.Router();
const usersModule = require("../../models/users.model");
const usersValidation = require("../../validation/users.validation");
const bcrypt = require("../../config/bcrypt");
const CustomRes = require("../../classes/CustomErr");

router.post("/signup", async (req, res) => {
  try {
    const validatedValue = await usersValidation.validateSignUpSchema(req.body);
    console.log("validate", validatedValue);
    const usersData = await usersModule.selectUserByEmail(validatedValue.email);
    if (usersData.length > 0)
      throw new CustomRes("failed", "email already exist");
    // throw { status: "failed", msg: "email already exist" };
    const hashedPassword = await bcrypt.createHash(validatedValue.password);
    const newUserData = await usersModule.insertUser(
      validatedValue.firstName,
      validatedValue.lastName,
      validatedValue.email,
      hashedPassword,
      validatedValue.phone
    );
    res.json(new CustomRes("OK", "User Created"));
  } catch (e) {
    console.log("error", e);
    res.json(e);
  }
});

router.post("/signIn", async (req, res) => {
  try {
    const validateLogIn = await usersValidation.validateSignInSchema(req.body);
    const usersData = await usersModule.selectUserByEmail(validateLogIn.email);
    if (usersData.length <= 0)
      throw new CustomRes("failed", "Invalid Email or Password");
    const hashResult = await bcrypt.compareHash(
      validateLogIn.password,
      usersData[0].password
    );
    if (!hashResult) throw new CustomRes("failed", "Invalid Email or Password");
    // throw { status: "failed", msg: "Invalid Email or Password" };
  } catch (e) {
    console.log(e);
  }
});

module.exports = router;
