const express = require("express");
const router = express.Router();
const UserModule = require("../../models/users.model");

router.post("/signup", (req, res) => {
  try {
  } catch (e) {}
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
