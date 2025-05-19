const express = require("express");
const { register, login, logout } = require("../controller/auth.controller.js");
const {
  validateUser,
  authenticateUser,
} = require("../middleware/auth.middleware.js");

const router = express.Router();

router.post("/register", validateUser, register);
router.post("/login", login);
router.post("/logout", logout);

module.exports = router;
