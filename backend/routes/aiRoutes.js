const express = require("express");
const router = express.Router();
const { getAIInsights } = require("../controllers/aiController");
const { protect } = require("../middleware/authMiddleware");

/**
 * @route   GET /api/ai/get-insights
 * @desc    Get AI-powered financial insights based on type (budget, investment, transactions)
 * @access  Private
 */
router.get("/get-insights", protect, getAIInsights);

module.exports = router;
