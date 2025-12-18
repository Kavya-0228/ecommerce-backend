const Order = require("../models/Order");
const Cart = require("../models/Cart");

// Get all orders of a user
const getOrders = async (req, res) => {
  const orders = await Order.find({ user: req.userData.id })
    .populate("products.product");

  res.status(200).json({ orders });
};

// Create order from cart
const createOrder = async (req, res) => {
  const cart = await Cart.findOne({ user: req.userData.id })
    .populate("products.product");

  if (!cart || cart.products.length === 0) {
    return res.status(400).json({ error: "Cart is empty" });
  }

  let totalAmount = 0;
  cart.products.forEach(item => {
    totalAmount += item.product.price * item.quantity;
  });

  const order = await Order.create({
    user: req.userData.id,
    products: cart.products,
    totalAmount,
  });

  // clear cart after order
  cart.products = [];
  await cart.save();

  res.status(200).json({ message: "Order placed", order });
};

module.exports = { getOrders, createOrder };
