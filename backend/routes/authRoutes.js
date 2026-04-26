const express = require("express");
const { registerUser, loginUser } = require("../controllers/authController");
const { protect } = require("../middleware/authMiddleware");
const router = express.Router();
router.get("/verify", protect, (req, res) => {
  res.json({ success: true });
});
router.post("/register", registerUser);
router.post("/login", loginUser);

module.exports = router;

module.exports = router;
