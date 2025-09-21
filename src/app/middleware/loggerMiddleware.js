// app/middleware/loggerMiddleware.js

const fs = require("fs");
const path = require("path");

module.exports = (req, res, next) => {
  const timestamp = new Date().toISOString();
  const method = req.method;
  const url = req.originalUrl;

  // IP address (trust proxy is already enabled in app.js)
  const ip = req.ip || (req.rateLimit ? req.rateLimit.key : "unknown");

  // User agent
  const userAgent = req.headers["user-agent"] || "unknown";

  // Build log message
  const logMessage = `[${timestamp}] ${method} ${url} - IP: ${ip} - UA: ${userAgent}\n`;

  // Print to console
  console.log(logMessage.trim());

  // Create log directory if not exists
  const logDir = path.join(__dirname, "../../storage/logs");
  if (!fs.existsSync(logDir)) {
    fs.mkdirSync(logDir, { recursive: true });
  }

  // Log file name = current date
  const logFile = path.join(logDir, `${new Date().toISOString().slice(0, 10)}.txt`);

  // Append log to file
  fs.appendFile(logFile, logMessage, (err) => {
    if (err) console.error("Failed to write log:", err);
  });

  next();
}
