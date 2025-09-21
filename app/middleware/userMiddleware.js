// app/middleware/userMiddleware.js

const jwt = require("jsonwebtoken");
require("dotenv").config();
const { CODES, MESSAGES } = require("@config/statusCodes");

// Middleware to verify JWT for authenticated users

exports.verifyUser = (req, res, next) => {
  const authHeader = req.headers["authorization"];
  if (!authHeader) return res.status(401).json({ message: "No token provided" });

  // Expect header in format: "Bearer <token>"
  const token = authHeader.split(" ")[1];
  if (!token) return res.status(CODES.UNAUTHORIZED).json({ message: "Malformed token" });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    
    // attach user info (id, role, etc.)
    req.user = decoded;
    next();
  } catch (err) {
    return res.status(CODES.FORBIDDEN).json({ message: "Invalid or expired token" });
  }
}