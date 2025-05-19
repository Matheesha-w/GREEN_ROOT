const express = require("express");
const { authorizePermissions, authenticateUser } = require("../middleware/auth.middleware");

const router = express.Router();

router.get("/dashboard", authenticateUser, authorizePermissions("admin"));

module.exports = router;