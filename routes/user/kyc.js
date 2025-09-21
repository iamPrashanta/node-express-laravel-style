// routes/user/kyc.js

const express = require("express");
const { verifyUser } = require("@middleware/userMiddleware");
// const kycController = require("@controllers/user/kycController");

const router = express.Router();

router.use(verifyUser);
// router.post("/submit", kycController.submitKYC);

module.exports = router;
