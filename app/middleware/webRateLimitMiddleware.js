// app/middleware/rateLimitMiddleware.js

const rateLimit = require("express-rate-limit");

const apiLimiter = rateLimit({
  windowMs: 1 * 60 * 1000, // 15 minutes
  max: 100, // limit each IP to 10 requests per windowMs
  message: {
    message: "Too many requests from this IP, please try again later."
  },
  standardHeaders: true, // Return rate limit info in headers
  legacyHeaders: false,  // Disable the `X-RateLimit-*` headers

  // Skip specific routes
  skip: (req) => {
    const excludedPaths = [
      "/ping", 
	    "/admin/ping",
	    "/user/ping",
	    "/tech/ping",
      "/user/auth/login",
      "/admin/auth/login",
	    "/tech/*",
    ];
    return excludedPaths.includes(req.path);
  }
});

module.exports = apiLimiter;


/*
IMPLEMENTATIONS HELPER CODE
Apply to Specific Routes Only
________________________________

const rateLimit = require("express-rate-limit");

// Stricter limiter for auth endpoints
const authLimiter = rateLimit({
  windowMs: 5 * 60 * 1000, // 5 minutes
  max: 5, // 5 requests per 5 minutes
  message: { message: "Too many login attempts, try again later." },
});

router.post("/login", authLimiter, userController.login);
router.post("/signup", authLimiter, userController.signup);
router.post("/forgot-password", authLimiter, userController.forgotPassword);
router.post("/reset-password", authLimiter, userController.resetPassword);
*/