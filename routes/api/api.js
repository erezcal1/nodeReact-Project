const express = require("express");
const router = express.Router();

const authMiddleware = require("../../middleware/auth.middleware");
const superAdminMiddleware = require("../../middleware/superAdmin.middleware");

const usersRouter = require("./user");
const animalsRouter = require("./animals");
const authRouter = require("./auth");
const productRouter = require("./products");

// http://localhost:3001/api/
router.get("/", authMiddleware, superAdminMiddleware, (req, res) => {
  res.json({ msg: "Hello World" });
});

router.use("/user", usersRouter);
router.use("/animals", animalsRouter);
router.use("/auth", authRouter);
router.use("/products", productRouter);

module.exports = router;
