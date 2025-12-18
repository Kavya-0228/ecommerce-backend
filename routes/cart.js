const express = require("express");
const{getCart,addtToCart, addToCart} = require("../contollers/cartController")
const router = express.Router();

router.get("/",getCart);
router.post("/",addToCart);

module.exports = router;
