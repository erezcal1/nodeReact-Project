const express = require("express");
const fs = require("fs").promises;
const router = express.Router();
// const multer = require("multer");
// const uploadMulter = multer({ dest: "uploads/" });
const multer = require("../../config/multerTypes");
const uploadImgMulter = multer.createMulter("uploads/", 3000000, {
  type: multer.allowedTypes.img,
});
// const uploadCustomMulter = multer.createMulter("uploads/custom/", 3000000, {
//   type: multer.allowedTypes.custom,
//   customFormats: ["image/jpeg", "image/png"],
// });
const productModel = require("../../models/products.model");
const productValidation = require("../../validation/product.validation");
const authMiddleware = require("../../middleware/auth.middleware");
// const superAdminMiddleware = require("../../middleware/superAdmin.middleware");
const sellerMiddleware = require("../../middleware/seller.middleware");
const CustomRes = require("../../classes/CustomErr");

router.get("/", async (req, res) => {
  try {
    const products = await productModel.selectAllProducts();
    res.json(products);
  } catch (err) {
    res.status(401).json(err);
  }
});

router.post(
  "/",
  authMiddleware,
  sellerMiddleware,
  uploadImgMulter.single("productImage"),
  // superAdminMiddleware,
  async (req, res) => {
    try {
      const validateNewProduct = await productValidation.validateNewProductSchema(
        req.body
      );
      await productModel.insertProduct(
        validateNewProduct.name,
        validateNewProduct.price,
        validateNewProduct.description,
        validateNewProduct.stock,
        req.file.filename,
        req.userData._id
      );
      res.json(new CustomRes(CustomRes.STATUSES.ok, "new product added"));
    } catch (err) {
      fs.unlink(req.file.path);
      res.status(401).json(err);
    }
  }
);

module.exports = router;
