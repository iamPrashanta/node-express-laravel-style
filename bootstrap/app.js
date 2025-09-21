// bootstrap/app.js
const express = require("express");
require("module-alias/register");
const cors = require("cors");
// const fs = require("fs");
// const path = require("path");
const webRateLimiter = require("@middleware/webRateLimitMiddleware");
const apiRateLimiter = require("@middleware/apiRateLimitMiddleware");
const modules = require("@config/modules");
const loggerMiddleware = require("@middleware/loggerMiddleware");
const sanitizeMiddleware = require("@middleware/sanitizeMiddleware");
const notFoundMiddleware = require("@middleware/notFoundMiddleware");
const errorHandler = require("@middleware/errorHandler");
require("dotenv").config();

const app = express();

// Trust proxy (fix for X-Forwarded-For issue)
app.set("trust proxy", 1); // trust first proxy (nginx/plesk)

// Middlewares
app.use(cors());
app.use(webRateLimiter);
app.use(loggerMiddleware);
app.use(sanitizeMiddleware);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/ping", (req, res) => res.json({ message: "pong" }));

if (modules.user) app.use("/user", require("@routes/user"));
if (modules.admin) app.use("/admin", require("@routes/admin"));
// if (modules.tech) app.use("/tech", apiRateLimiter, require("@routes/tech"));

// add module routes dynamically
// const routesDir = path.join(__dirname, "../routes");
// fs.readdirSync(routesDir).forEach(file => {
//     const moduleName = file.replace(".js", "");
//     if (modules[moduleName]) {
//         app.use(`/${moduleName}`, require(path.join(routesDir, file)));
//     }
// });

// Fallback middlewares (must be last)
app.use(notFoundMiddleware);
app.use(errorHandler);

module.exports = app;
