const express = require("express");
const { getOrders, createOrder } = require("../contollers/orderController");

const router = express.Router();

router.get("/", getOrders);
router.post("/", createOrder);

module.exports = router;
