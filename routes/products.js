const express = require("express");
const Product = require("../models/product");

const router = express.Router();

// GET all products
router.get("/", async (req, res) => {
  try {
    const products = await Product.find();
    res.json(products);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// POST a new product
router.post("/", async (req, res) => {
  try {
    const { product_id, name, original_price, selling_price, category, ratings, image_url } = req.body;

    const newProduct = await Product.create({
      product_id,
      name,
      original_price,
      selling_price,
      category,
      ratings,
      image_url
    });

    res.status(201).json({ message: "Product created successfully", product: newProduct });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

module.exports = router;