// routes/user/index.js

const express = require("express");
const router = express.Router();

router.use("/ping", require("./ping"));     // /user/ping/*
router.use("/auth", require("./auth"));     // /user/auth/*
router.use("/kyc", require("./kyc"));       // /user/kyc/*

module.exports = router;
