const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const cookieParser = require("cookie-parser");

const mongoose = require("mongoose");
const authRoutes = require("./routes/authRoutes");
const transactionRoutes = require("./routes/transactionRoutes"); // 1. Added this

dotenv.config();
const app = express();

app.use(
  cors({
    origin: process.env.FRONTEND_URL,
    credentials: true,
  }),
);

app.use(cookieParser());
app.use(express.json());

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/transactions", transactionRoutes); // 3. Registered the transactions route
app.use("/api/budget", require("./routes/budgetRoutes"));
app.use("/api/investments", require("./routes/investmentRoutes"));
app.use("/api/ai", require("./routes/aiRoutes"));
app.use("/api/dashboard", require("./routes/dashboardRoutes"));

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("✅ MongoDB Connected"))
  .catch((err) => console.log("❌ DB Error:", err));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
