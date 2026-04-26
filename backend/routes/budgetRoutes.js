const express = require("express");
const router = express.Router();
const {
  setBudget,
  getBudgets,
  deleteBudget,
} = require("../controllers/budgetController");
const { protect } = require("../middleware/authMiddleware");

router.route("/").get(protect, getBudgets).post(protect, setBudget);
router.route("/:id").delete(protect, deleteBudget);
module.exports = router;
