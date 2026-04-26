const express = require("express");
const router = express.Router();
const {
  getInvestments,
  addInvestment,
  deleteInvestment,
} = require("../controllers/investmentController");
const { protect } = require("../middleware/authMiddleware");

// All routes are protected
router.route("/").get(protect, getInvestments).post(protect, addInvestment);

router.route("/:id").delete(protect, deleteInvestment);

module.exports = router;
