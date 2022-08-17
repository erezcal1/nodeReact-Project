const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const animalSchema = new Schema({
  name: { type: String, required: true },
  size: { type: String, required: true },
  image: { type: String },
});

const Animals = mongoose.model("Animals", animalSchema);

const insertAnimal = (name, size, image) => {
  const animal = new Animals({
    name,
    size,
    image,
  });
  return animal.save();
};
module.exports = { insertAnimal };
