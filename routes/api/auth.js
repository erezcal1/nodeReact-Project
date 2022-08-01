const express = require("express");
const router = express.Router();
const usersModule = require("../../models/users.model");
const usersValidation = require("../../validation/users.validation");

router.post("/signup", async (req, res) => {
  try {
    const validatedValue = await usersValidation.validateSignUpSchema(req.body);
    console.log("validate", validatedValue);
    const usersData = await usersModule.selectUserByEmail(validatedValue.email);
    if (usersData.length > 0) {
      throw { status: "failed", msg: "email already exist" };
    }
    res.json(usersData);
  } catch (e) {
    console.log("error", e);
    res.json(e);
  }
});

// router.post("/signup", async (req, res) => {
//   try {
//     const user = await UserModule.insertUser(
//       "kenny",
//       "mc",
//       "kenny@hllo.com",
//       "123",
//       "050"
//     );
//     console.log("user", user);
//   } catch (err) {}
// });

module.exports = router;
