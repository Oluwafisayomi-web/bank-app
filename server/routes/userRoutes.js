const express = require("express");
const router = express.Router();

const protect = require("../middleware/authMiddleware");

const User = require("../models/User");

// protected profile
router.get("/profile", protect, (req, res) => {
  res.json({
    message: "Protected profile route",
    user: req.user,
  });
});

// temporary fund route
router.put("/fund", protect, async (req, res) => {
  try {
    const { amount } = req.body;

    const user = await User.findById(req.user.id);

    user.balance += amount;

    await user.save();

    res.json({
      message: "Account funded",
      balance: user.balance,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
});

module.exports = router;