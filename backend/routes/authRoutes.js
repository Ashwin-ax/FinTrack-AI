const express = require("express");
const { registerUser, loginUser } = require("../controllers/authController");
const { protect } = require("../middleware/authMiddleware");
const router = express.Router();

router.get("/verify", protect, (req, res) => {
  res.json({ success: true });
});
router.post("/register", registerUser);

router.post("/login", loginUser);

router.post("/logout", (req, res) => {
  res.cookie("token", "", {
    httpOnly: true,
    secure: true,
    sameSite: "None",
    expires: new Date(0), // 🔥 deletes cookie
  });

  res.json({ message: "Logged out successfully" });
});

module.exports = router;
