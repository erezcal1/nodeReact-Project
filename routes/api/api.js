const express = require("express");
const router = express.Router();

// http://localhost:3001/api/
router.get("/", (req, res) => {
  res.json({ msg: "Hello World" });
});
// http://localhost:3001/api/animals
router.get("/animals", (req, res) => {
  res.json(["cat", "dog", "bird", "fish", "snake"]);
});

module.exports = router;
