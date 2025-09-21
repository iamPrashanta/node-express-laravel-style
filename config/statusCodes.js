// app/config/statusCodes.js

const CODES = {
  // 2xx Success
  OK: 200,
  CREATED: 201,
  ACCEPTED: 202,
  NO_CONTENT: 204,

  // 4xx Client Errors
  BAD_REQUEST: 400,
  UNAUTHORIZED: 401,
  FORBIDDEN: 403,
  NOT_FOUND: 404,
  METHOD_NOT_ALLOWED: 405,
  CONFLICT: 409,
  UNPROCESSABLE_ENTITY: 422,
  TOO_MANY_REQUESTS: 429,

  // 5xx Server Errors
  INTERNAL_SERVER_ERROR: 500,
  NOT_IMPLEMENTED: 501,
  BAD_GATEWAY: 502,
  SERVICE_UNAVAILABLE: 503,
  GATEWAY_TIMEOUT: 504
};

// Default messages (optional, can be overridden)
const MESSAGES = {
  // 2xx Success
  OK: "Success",
  CREATED: "Created successfully",
  ACCEPTED: "Request accepted",
  NO_CONTENT: "No content",

  // 4xx Client Errors
  BAD_REQUEST: "Bad request",
  UNAUTHORIZED: "Unauthorized",
  FORBIDDEN: "Forbidden",
  NOT_FOUND: "Resource not found",
  METHOD_NOT_ALLOWED: "Method not allowed",
  CONFLICT: "Conflict",
  UNPROCESSABLE_ENTITY: "Unprocessable entity",
  TOO_MANY_REQUESTS: "Too many requests",

  // 5xx Server Errors
  INTERNAL_SERVER_ERROR: "Internal server error",
  NOT_IMPLEMENTED: "Not implemented",
  BAD_GATEWAY: "Bad gateway",
  SERVICE_UNAVAILABLE: "Service unavailable",
  GATEWAY_TIMEOUT: "Gateway timeout"
};

module.exports = { CODES, MESSAGES };



/*
IMPLEMENTATIONS HELPER CODE

const { CODES, MESSAGES } = require("@config/statusCodes");

// Successful login
res.status(CODES.OK).json({ message: MESSAGES.OK, token });

// User not found
res.status(CODES.NOT_FOUND).json({ message: MESSAGES.NOT_FOUND });

// Validation error (override default message)
res.status(CODES.UNPROCESSABLE_ENTITY).json({ message: "Email is required" });

*/