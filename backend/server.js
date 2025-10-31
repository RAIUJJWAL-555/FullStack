import express from "express";
import cors from "cors";
import "dotenv/config";
import connectDB from "./config/mongodb.js";
import connectCloudinary from "./config/cloudinary.js";
import userRouter from "./routes/userRoute.js";
import productRouter from "./routes/productRoute.js";
import cartRouter from "./routes/cartRoute.js";
import orderRouter from "./routes/orderRoutes.js";

// App config
const app = express();
const port = process.env.PORT || 4000;

// Mongo connection
connectDB();
connectCloudinary();

// Middleware
app.use(express.json());
app.use(cors());

// Test API endpoint
app.use('/api/user',userRouter);
app.use('/api/product',productRouter);
app.use('/api/cart',cartRouter);
app.use('/api/order',orderRouter);



app.get("/", (req, res) => {
  res.send("API working");
});


// Server start
app.listen(port, () =>
  console.log("🚀 Server is running on PORT: " + port)
);
