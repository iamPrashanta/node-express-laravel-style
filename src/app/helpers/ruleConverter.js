// app/helpers/ruleConverter.js

const { check } = require("express-validator");

// Convert Laravel-style rules into express-validator checks
// rules - Example: { email: "required|email", password: ["required","string"] }

function makeValidators(rules) {
  const validators = [];

  for (const field in rules) {
    let fieldRules = rules[field];

    // Support "required|email" or ["required", "email"]
    if (typeof fieldRules === "string") {
      fieldRules = fieldRules.split("|");
    }

    // Start chain
    let chain = check(field);

    fieldRules.forEach(rule => {
      if (rule === "required") {
        chain = chain.notEmpty().withMessage(`${field} is required`);
      }
      if (rule === "email") {
        chain = chain.isEmail().withMessage(`${field} must be a valid email`);
      }
      if (rule === "string") {
        chain = chain.isString().withMessage(`${field} must be a string`);
      }
      if (rule.startsWith("min:")) {
        const min = parseInt(rule.split(":")[1], 10);
        chain = chain.isLength({ min }).withMessage(`${field} must be at least ${min} characters`);
      }
      if (rule.startsWith("max:")) {
        const max = parseInt(rule.split(":")[1], 10);
        chain = chain.isLength({ max }).withMessage(`${field} must be at most ${max} characters`);
      }
      if (rule.startsWith("in:")) {
        const values = rule.split(":")[1].split(",");
        chain = chain.isIn(values).withMessage(`${field} must be one of: ${values.join(", ")}`);
      }
      if (rule === "numeric") {
        chain = chain.isNumeric().withMessage(`${field} must be numeric`);
      }
    });

    validators.push(chain);
  }

  return validators;
}

module.exports = makeValidators;
