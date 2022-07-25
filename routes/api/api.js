const express = require("express");
const router = express.Router();
const usersRouter = require("./user");

// http://localhost:3001/api/
router.get("/", (req, res) => {
  res.json({ msg: "Hello World" });
});
// http://localhost:3001/api/animals
router.get("/animals", (req, res) => {
  res.json(["cat", "dog", "bird", "fish", "snake"]);
});
router.use("/user", usersRouter);

module.exports = router;
