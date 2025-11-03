import express from "express";
import cors from "cors";
import "dotenv/config";
import connectDB from "./config/mongodb.js";
import connectCloudinary from "./config/cloudinary.js";
import userRouter from "./routes/userRoute.js";
import productRouter from "./routes/productRoute.js";
import cartRouter from "./routes/cartRoute.js";
import orderRouter from "./routes/orderRoutes.js";

const app = express();
const port = process.env.PORT || 4000;

// Database & Cloudinary setup
connectDB();
connectCloudinary();

// Middleware
app.use(express.json());
app.use(cors({
  origin: [
    "https://full-stack-frontend-f0ov1ep77-rai-7203e9db.vercel.app",
    "https://full-stack-admin1.vercel.app/",  // ← add your admin panel domain
    "http://localhost:5173"  // optional, for local dev
  ],
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  credentials: true,
}));

app.options('*', cors());

// Routes
app.use("/api/user", userRouter);
app.use("/api/product", productRouter);
app.use("/api/cart", cartRouter);
app.use("/api/order", orderRouter);

// Test route
app.get("/", (req, res) => {
  res.send("API working ✅");
});

// Server start
app.listen(port, () =>
  console.log(`🚀 Server running on PORT: ${port}`)
);
