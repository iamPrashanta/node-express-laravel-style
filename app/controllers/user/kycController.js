// app/controllers/user/kycController.js

const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const pool = require("@config/database");
const { table, hidden } = require("@models/userModel");
const { validationResult } = require("express-validator");
const makeValidators = require("@helpers/ruleConverter");
const { CODES, MESSAGES } = require("@config/statusCodes");
require("dotenv").config();


// Validation Rules

const submitKYCRules = makeValidators({
  // add extra params for submit kyc rules
});


exports.login = [
  ...loginRules,
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(CODES.UNPROCESSABLE_ENTITY).json({ errors: errors.array() });
    }

    try {
      res.status(CODES.OK).json({
          message: MESSAGES.OK
      });
    } catch (err) {
      next(err);
    }
  }
];