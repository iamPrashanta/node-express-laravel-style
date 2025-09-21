// app/middleware/adminMiddleware.js

const { verifyUser } = require("@middleware/userMiddleware"); // re using the userMiddleware to handles token verification
const { CODES, MESSAGES } = require("@config/statusCodes");

exports.verifyAdmin = (req, res, next) => {
  // verify the token
  verifyUser(req, res, () => {
    // check if the role is admin
    if (req.user && req.user.role === "admin") {
      next();
    } else {
      res.status(CODES.FORBIDDEN).json({ message: MESSAGES.FORBIDDEN });
    }
  });
}