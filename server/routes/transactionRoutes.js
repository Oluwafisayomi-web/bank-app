const express = require("express");
const router = express.Router();

const protect = require("../middleware/authMiddleware");

const {
  sendMoney,
  withdrawMoney,
  depositMoney, // ✅ FIXED: added this
  getTransactions,
} = require("../controllers/transactionController");


// send money
router.post("/send", protect, sendMoney);

// withdraw money
router.put("/withdraw", protect, withdrawMoney);

// deposit money
router.post("/deposit", protect, depositMoney);

// transaction history
router.get("/history", protect, getTransactions);

module.exports = router;