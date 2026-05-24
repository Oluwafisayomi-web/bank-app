const express = require("express");
const router = express.Router();

const protect = require("../middleware/authMiddleware");
const admin = require("../middleware/adminMiddleware");

const {
  getAllUsers,
  deleteUser,
} = require("../controllers/adminController");

// get all users
router.get("/users", protect, admin, getAllUsers);

// delete user
router.delete("/users/:id", protect, admin, deleteUser);

module.exports = router;