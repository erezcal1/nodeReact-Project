const express = require("express");
const router = express.Router();
const usersModule = require("../../models/users.model");
const usersValidation = require("../../validation/users.validation");
const bcrypt = require("../../config/bcrypt");
const CustomRes = require("../../classes/CustomErr");
const jwt = require("../../config/jwt");
const generateRandomAlphaNumStr = require("../../utils/generateRandomAlphaNumStr");

router.post("/signup", async (req, res) => {
  try {
    const validatedValue = await usersValidation.validateSignUpSchema(req.body);
    console.log("validate", validatedValue);
    const usersData = await usersModule.selectUserByEmail(validatedValue.email);
    if (usersData.length > 0)
      throw new CustomRes(CustomRes.STATUSES.failed, "email already exist");
    // throw { status: "failed", msg: "email already exist" };
    const hashedPassword = await bcrypt.createHash(validatedValue.password);
    const newUserData = await usersModule.insertUser(
      validatedValue.firstName,
      validatedValue.lastName,
      validatedValue.email,
      hashedPassword,
      validatedValue.phone
    );
    res.json(new CustomRes(CustomRes.STATUSES.ok, "User Created"));
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
      throw new CustomRes(
        CustomRes.STATUSES.failed,
        "Invalid Email or Password"
      );
    const hashResult = await bcrypt.compareHash(
      validateLogIn.password,
      usersData[0].password
    );
    if (!hashResult)
      throw new CustomRes(
        CustomRes.STATUSES.failed,
        "Invalid Email or Password"
      );
    let token = await jwt.generateToken({ email: usersData[0].email });
    res.json(new CustomRes(CustomRes.STATUSES.ok, token));
  } catch (e) {
    console.log(e);
  }
});
router.post("/forgetPassword", async (req, res) => {
  try {
    const validateForgetPassword = await usersValidation.validateForgetPasswordSchema(
      req.body
    );
    const usersData = await usersModule.selectUserByEmail(validateLogIn.email);
    if (usersData.length <= 0)
      throw new CustomRes(CustomRes.STATUSES.ok, "Email sent");
    const secretKey = generateRandomAlphaNumStr(4);
    const urlSecretKey = `http://localhost:${process.env.PORT}/api/recover-password/${secretKey}`;
    // Date works with ms /1800000ms= 60s*30m*1000ms
    const expDate = new Date(Date.now()+1800000)
    await usersModule.updateRecovery(validateForgetPassword.email, secretKey - )
  } catch (e) {
    console.log(e);
  }
});
router.get("/recover-password/:secretKey", (req, res) => {});
router.post("/recover-password/:secretKey", (req, res) => {});
module.exports = router;
