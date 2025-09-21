// app/middleware/errorHandler.js

const fs = require("fs");
const path = require("path");
const { CODES, MESSAGES } = require("@config/statusCodes");

module.exports = (err, req, res, next) => {
  const timestamp = new Date().toISOString();

  const logMessage = `
    [${timestamp}] ERROR
    URL: ${req.method} ${req.originalUrl}
    Message: ${err.message}
    Stack: ${err.stack}`;

  console.error(logMessage);
  const logDir = path.join(__dirname, "../../storage/logs");
  if (!fs.existsSync(logDir)) fs.mkdirSync(logDir, { recursive: true });
  const logFile = path.join(logDir, `${new Date().toISOString().slice(0, 10)}.txt`);
  fs.appendFileSync(logFile, logMessage);

  res.status(CODES.INTERNAL_SERVER_ERROR).json({ error: MESSAGES.INTERNAL_SERVER_ERROR });
};
