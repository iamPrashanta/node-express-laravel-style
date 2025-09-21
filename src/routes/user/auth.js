// routes/user/auth.js

const express = require("express");
const authController = require("@controllers/user/authController");
const { verifyUser } = require("@middleware/userMiddleware");

const router = express.Router();

// public
router.post("/signup", authController.signup);
router.post("/login", authController.login);

// // protected, all routes below require JWT
// router.use(verifyUser);

router.get("/profile", verifyUser, authController.getProfile);


module.exports = router;
