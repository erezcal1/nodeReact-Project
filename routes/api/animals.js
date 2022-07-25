const express = require("express");
const router = express.Router();

let animalsArr = [];
// http://localhost:3001/api/animals
router.get("/", (req, res) => {
  res.json(animalsArr);
});
// http://localhost:3001/api/animals/add-new-animal
router.post("/add-new-animal", (req, res) => {
  animalsArr = [...animalsArr, req.body.animal];
  res.json({ msg: "Animal added successfully" });
});
module.exports = router;
