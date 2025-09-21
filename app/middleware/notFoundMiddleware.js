// app/middleware/notFoundMiddleware.js

const { CODES, MESSAGES } = require("@config/statusCodes");

module.exports = (req, res, next) => {
  const message = `Route not found: ${req.method} ${req.originalUrl}`;
  console.error(message);

  res.status(CODES.NOT_FOUND).json({ error: MESSAGES.NOT_FOUND, message });
};
