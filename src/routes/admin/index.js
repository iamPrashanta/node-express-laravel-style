// routes/admin/index.js

const express = require("express");
const router = express.Router();

router.use("/ping", require("./ping"));         // /admin/ping/*
router.use("/auth", require("./auth"));         // /admin/auth/*
router.use("/kyc-data", require("./kycData"));  // /admin/kyc-data/*
router.use("/users", require("./userData"));    // /admin/users/*
router.use("/reports", require("./reports"));   // /admin/reports/*

module.exports = router;
