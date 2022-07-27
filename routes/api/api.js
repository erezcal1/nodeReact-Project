const express = require("express");
const router = express.Router();
const usersRouter = require("./user");
const animalsRouter = require("./animals");
const authRouter = require("./auth");

// http://localhost:3001/api/
router.get("/", (req, res) => {
  res.json({ msg: "Hello World" });
});

router.use("/user", usersRouter);
router.use("/animals", animalsRouter);
router.use("/auth", authRouter);

module.exports = router;
