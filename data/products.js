const express = require("express");
const router = express.Router();
const Product = require("../models/product");

// ➤ Get all products
router.get("/", async (req, res) => {
  const products = await Product.find();
  res.json(products);
});

// ➤ Add product
router.post("/", async (req, res) => {
  const { name, price, image } = req.body;

  const newProduct = new Product({ name, price, image });
  await newProduct.save();

  res.json({ message: "Product Added Successfully!" });
});

module.exports = router;