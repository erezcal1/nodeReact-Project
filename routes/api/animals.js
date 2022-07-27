const express = require("express");
const router = express.Router();

let animalsArr = [];
// http://localhost:3001/api/animals
router.get("/", (req, res) => {
  res.json(animalsArr);
});
// http://localhost:3001/api/animals/add-new-animal
router.post("/add-new-animal", (req, res) => {
  animalsArr = [...animalsArr, req.body];
  res.json({ msg: "Animal added successfully" });
});
router.patch("/edit-animal/", (req, res) => {
  let animal = animalsArr.find((item) => item._id === req.body._id);
  if (animal) {
    animal.name = req.body.name;
    res.json({ msg: "Animal edited successfully" });
  } else res.json({ msg: "Animal not found" });
});

router.delete("/delete-animal", (req, res) => {
  let animal = animalsArr.find((item) => item._id === req.body._id);
  if (animal) {
    animalsArr = animalsArr.filter((item) => item._id !== req.body._id);
    res.json({ msg: "Animal deleted successfully" });
  } else res.json({ msg: "Animal not found" });
});
module.exports = router;
