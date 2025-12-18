// const express = require("express");
// const cors = require("cors");
// const connectDB = require("./config/db");

// const productRoutes = require("./routes/products");

// const app = express();
// app.use(cors());
// app.use(express.json());

// // Connect to MongoDB
// connectDB();

// // Middleware for logging
// app.use((req, res, next) => {
//   console.log(`${req.method} ${req.url}`);
//   next();
// });

// // Routes
// app.get("/", (req, res) => {
//   res.json({ message: "Hello Express!" });
// });

// app.use("/products", productRoutes);

// // Start server on port 3000
// app.listen(3000, () => {
//   console.log("Server running at http://localhost:3000");
// });
require("dotenv").config();
const express = require('express')
const app = express()
const fs = require('fs')
const createDB = require("./config/db");
createDB()
app.use(express.json())
const productRouter=require("./routes/products.js");
const authRouter = require("./routes/auth.js");
const cartRouter = require("./routes/cart.js");
const orderRouter = require("./routes/order.js")
const authMiddleware = require("./middlewares/authMiddleware.js")
const User = require("./models/User.js")

// Middleware - process between req and res
app.use((req,res,next) =>
{
    console.log(`${req.method} ${req.url}`)
    next();
})

app.get("/",(req,res) => {
    res.json({message : "Hello Express!"});
});

app.get("/about",(req,res) => {
    res.json({message : "About"});
});
app.use("/products",productRouter);
app.use("/auth",authRouter);
app.use("/cart",cartRouter);
app.use("/order",orderRouter);

app.get("/profile",authMiddleware,async(req,res)=>{
    const user = await User.findById(req,userData.id).select("-password")
    res.status(200).json({message:"profile",userData:user});
})

app.listen(process.env.PORT, () => {
    console.log(`Server running at http://localhost:${process.env.PORT}`);
})