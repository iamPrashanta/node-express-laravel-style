// routes/admin/auth.js

const express = require("express");
const authController = require("@controllers/admin/authController");
const { verifyAdmin } = require("@middleware/adminMiddleware");

const router = express.Router();

// public
router.post("/login", authController.login);

// // protected , all routes below require JWT
// router.use(verifyAdmin);

router.get("/profile", verifyAdmin, authController.getProfile);

module.exports = router;
