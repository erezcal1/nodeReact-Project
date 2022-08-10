const express = require("express");
const router = express.Router();
const usersModule = require("../../models/users.model");
const usersValidation = require("../../validation/users.validation");
const bcrypt = require("../../config/bcrypt");
const CustomRes = require("../../classes/CustomErr");
const jwt = require("../../config/jwt");
const generateRandomAlphaNumStr = require("../../utils/generateRandomAlphaNumStr");
const sendEmail = require("../../config/mailer");
const crypto = require("../../config/crypto");
const { date } = require("joi");

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
    console.log("hello");
    const validateForgetPassword = await usersValidation.validateForgetPasswordSchema(
      req.body
    );
    const usersData = await usersModule.selectUserByEmail(
      validateForgetPassword.email
    );
    if (usersData.length <= 0)
      throw new CustomRes(CustomRes.STATUSES.ok, "Email sent");
    const secretKey = generateRandomAlphaNumStr(8);
    const encryptedData = crypto.encrypt(validateForgetPassword.email);
    const urlSecretKey = `http://localhost:3000/recover-password/${secretKey}/${encryptedData.iv}/${encryptedData.encryptedData}`;
    // Date works with ms /1800000ms= 60s*30m*1000ms
    const expDate = new Date(Date.now() + 1800000);

    await usersModule.updateRecovery(
      validateForgetPassword.email,
      secretKey,
      expDate
    );
    sendEmail({
      from: process.env.EMAIL_EMAIL,
      to: process.env.EMAIL_EMAIL,
      subject: "your recovery email",
      html: `
        <h1>Your recovery Link</h1>
        <a href="${urlSecretKey}">Recovery Link</a>
      `,
    });
    res.json(new CustomRes(CustomRes.STATUSES.ok, "Email sent"));
  } catch (e) {
    console.log(e);
    res.json(e);
  }
});

router.post(
  "/recover-password/:secretKey/:iv/:encryptedData",
  async (req, res) => {
    try {
      const validatedRecoverPassword = await usersValidation.validateRecoveryPasswordSchema(
        req.body
      );
      // decrypt Email - in the future
      // decrypted Email validation
      const decryptedEmail = crypto.decrypt({
        iv: req.params.iv,
        encryptedData: req.params.encryptedData,
      });
      const validateEmail = await usersValidation.validateRecoveryPassEmailCheckSchema(
        { email: decryptedEmail }
      );
      const usersData = await usersModule.selectUserByEmail(
        validateEmail.email
      );
      if (usersData.length <= 0)
        throw new CustomRes(CustomRes.STATUSES.failed, "Something went wrong");

      if (usersData[0].recovery.secretKey !== req.params.secretKey) {
        throw new CustomRes(CustomRes.STATUSES.failed, "Something went wrong");
      }
      const dateNow = new Date();
      if (dateNow.getTime() > usersData[0].recovery.dateRecovery.getTime())
        throw new CustomRes(CustomRes.STATUSES.failed, "Something went wrong");

      const hashedPassword = await bcrypt.createHash(
        validatedRecoverPassword.password
      );
      await usersModule.updatePassword(validateEmail.email, hashedPassword);
      res.json(new CustomRes(CustomRes.STATUSES.ok, "Password Changed"));
      // TODO: check secretKey expDate, encrypt Email and decrypt email
    } catch (err) {
      res.json(err);
    }
  }
);
module.exports = router;

/*
create google mail sending reset password
create google mail
go to google developer console
create new project
consent{
create new OAUTH place
external
scope - nothing
test-users : emails for testing
at the end back to dashboard
}
create credential Oauth client ID {
application type: web applications
web application name
Authorized URI: https://developers.google.com/oauthplaygorund/
}
need to save two keys in ENV: client ID, client secret

goto Oauth playground
settings: put the keys 
add gmail api
adn click continue
exchange authorization code for tokens
save refresh token (only allows for 1 hour)
*/
