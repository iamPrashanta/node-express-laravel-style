// routes/user/ping.js

const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
  res.json({ message: "pong from user module" });
});

module.exports = router;
