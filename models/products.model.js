const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const productSchema = new Schema({
  name: { type: String, required: true },
  price: { type: Number, required: true },
  description: { type: String, required: true },
  stock: { type: Number, default: 0 },
  image: { type: String },
  sellerId: { type: Schema.Types.ObjectId, ref: "Users" },
});

const Products = mongoose.model("Products", productSchema);

const selectAllProducts = () => {
  return Products.find();
};

const insertProduct = (name, price, description, stock, image, sellerId) => {
  const product = new Products({
    name,
    price,
    description,
    stock,
    image,
    sellerId,
  });
  return product.save();
};

module.exports = { selectAllProducts, insertProduct };
