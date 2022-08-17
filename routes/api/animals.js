const express = require("express");
const fs = require("fs").promises;
const router = express.Router();
const multer = require("../../config/multer");
const uploadMulter = multer("uploads/", 300000, (req, file, cb) => {
  const allowedFormat = ["image/jpeg", "image/png"];
  cb(null, allowedFormat.includes(file.mimetype));
});
const animalsModel = require("../../models/animal.model");
const animalsValidation = require("../../validation/animals.validation");
const CustomRes = require("../../classes/CustomErr");

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
router.post(
  "/add-new-animal",
  uploadMulter.single("animalImage"),
  async (req, res) => {
    try {
      const validateAnimal = await animalsValidation.validateNewAnimalSchema(
        req.body
      );
      await animalsModel.insertAnimal(
        validateAnimal.name,
        validateAnimal.size,
        req.file.filename
      );
      res.json(new CustomRes(CustomRes.STATUSES.ok, "new animal added"));
    } catch (err) {
      fs.unlink(req.file.path);
      console.log(err);
    }
  }
);

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
