const express = require("express");
const router = express.Router();
const { getDashboardStats } = require("../controllers/dashboardController");
const { protect } = require("../middleware/authMiddleware");

// Ensure this matches your server.js mount point
router.get("/", protect, getDashboardStats);

module.exports = router;
