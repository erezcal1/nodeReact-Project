const express = require("express");
const router = express.Router();

let animalsArr = [
  {
    _id: 1,
    name: "dog",
    age: 5,
  },
  {
    _id: 2,
    name: "unicorn",
    age: 500,
  },
  {
    _id: 3,
    name: "hiydra",
    age: 863,
  },
  {
    _id: 4,
    name: "iguana",
    age: 20,
  },
  {
    _id: 5,
    name: "cat",
    age: 1,
  },
];

// http://localhost:3001/api/animals
router.get("/", (req, res) => {
  res.json(animalsArr);
});
router.get("/get-animal-by-id", (req, res) => {
  console.log(req.query);
  let animal = animalsArr.find((item) => item._id == req.query.id);
  if (animal) {
    res.json(animal);
  } else res.json({ msg: "id not found" });
});
router.get("/bigger-then-8", (req, res) => {
  let animals = [];
  animals = animalsArr.filter((animal) => animal.age > req.params.age);
  if (animals) {
    res.json(animals);
  } else res.json({ msg: "cant find old animals" });
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

router.delete("/delete-animal/:id", (req, res) => {
  let animal = animalsArr.find((item) => item._id === req.params._id);
  if (animal) {
    animalsArr = animalsArr.filter((item) => item._id !== req.body._id);
    res.json({ msg: "Animal deleted successfully" });
  } else res.json({ msg: "Animal not found" });
});
module.exports = router;
