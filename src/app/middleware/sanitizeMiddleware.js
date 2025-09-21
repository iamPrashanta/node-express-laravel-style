// app/middleware/sanitizeMiddleware.js

function clean(value) {
  if (typeof value !== "string") return value;
  value = value.replace(/javascript\s*:[^;\s]+;?/gi, "");
  return value.replace(/<[^>]*>?/gm, ""); // strip tags
}

module.exports = (req, res, next) => {
  if (req.body) {
    Object.keys(req.body).forEach(key => {
      if (typeof req.body[key] === "string") {
        req.body[key] = clean(req.body[key]);
      }
    });
  }
  if (req.query) {
    Object.keys(req.query).forEach(key => {
      if (typeof req.query[key] === "string") {
        req.query[key] = clean(req.query[key]);
      }
    });
  }
  next();
};
