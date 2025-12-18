const mongoose = require("mongoose");

const productSchema = new mongoose.Schema(
  {
    product_id: { type: Number, required: true, unique: true },
    name: { type: String, required: true },
    original_price: { type: Number, required: true },
    selling_price: { type: Number, required: true },
    category: { type: String, required: true },
    ratings: { type: Number, required: true, min: 0, max: 5.5 },
    image_url: { type: String, required: true }
  },
  { timestamps: true }
);

module.exports = mongoose.model("Product", productSchema);