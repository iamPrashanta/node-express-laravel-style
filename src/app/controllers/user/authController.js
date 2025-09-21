// app/controllers/user/authController.js

const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const pool = require("@config/database");
const { table, hidden } = require("@models/userModel");
const { validationResult } = require("express-validator");
const makeValidators = require("@helpers/ruleConverter");
const { CODES, MESSAGES } = require("@config/statusCodes");
require("dotenv").config();


// Validation Rules

const loginRules = makeValidators({
  email: ["required", "email"],
  password: ["required", "string", "min:6"]
});

const signupRules = makeValidators({
  profileType: ["required", "string", "in:user,admin"],
  email: ["required", "email"],
  mobile: ["required", "string", "min:10", "max:15"],
  name: ["required", "string", "min:2"]
});

const getProfileRules = makeValidators({
  // add extra params for getting user profile data
});

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

    const { email, password } = req.body;
    try {
      const result = await pool.query(
        `SELECT * FROM ${table} WHERE email = $1 AND role_id = $2`,
        [userId, 3] // role_id 3 = user
      );
      if (result.rows.length === 0) return res.status(CODES.BAD_REQUEST).json({ message: "Invalid credentials" });

      // Fix PHP bcrypt hash
      const hashedPassword = result.rows[0].password.replace(/^\$2y\$/, "$2a$");
      const valid = await bcrypt.compare(password, hashedPassword);
      if (!valid) return res.status(CODES.BAD_REQUEST).json({ message: "Invalid credentials" });

      const token = jwt.sign(
        { id: result.rows[0].id, role: "user" },
        process.env.JWT_SECRET,
        { expiresIn: "1h" }
      );

      res.json({ token });
    } catch (err) {
      next(err);
    }
  }
];


exports.signup = [
  ...signupRules,
  async (req, res) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(CODES.UNPROCESSABLE_ENTITY).json({ errors: errors.array() });
      }

      const { profileType, email, mobile, name } = req.body;

      // Check if email already exists
      const existingEmail = await pool.query(`SELECT id FROM ${table} WHERE email = $1`, [email]);
      if (existingEmail.rows.length > 0) {
        return res.status(CODES.BAD_REQUEST).json({ message: "Email already exists" });
      }

      // Check if mobile already exists
      const existingMobile = await pool.query(`SELECT id FROM ${table} WHERE mobile = $1`, [mobile]);
      if (existingMobile.rows.length > 0) {
        return res.status(CODES.BAD_REQUEST).json({ message: "Mobile already exists" });
      }

      // Hash password using mobile number (PHP bcrypt compatible)
      const rawPassword = mobile;
      let hashedPassword = await bcrypt.hash(rawPassword, 10);
      hashedPassword = hashedPassword.replace(/^\$2a\$/, "$2y$"); // PHP fix

      const result = await pool.query(
        `INSERT INTO ${table} (name, email, mobile, password, role_id, status)
         VALUES ($1, $2, $3, $4, $5, $6)
         RETURNING id, name, email, mobile, role_id, status`,
        [
          id,
          name,
          email,
          mobile,
          hashedPassword,
          profileType.toLowerCase() === "admin" ? 1 : 3, // role IDs (1=admin, 3=user)
          "active"
        ]
      );

      const newUser = result.rows[0];

      res.status(CODES.CREATED).json({
        message: "User registered successfully",
        user: newUser
      });
    } catch (err) {
      next(err);
    }
  }
];


exports.getProfile = [
  ...getProfileRules,
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(CODES.UNPROCESSABLE_ENTITY).json({ errors: errors.array() });
    }

    try {
      const userId = req.user.id;
      const result = await pool.query(
        `SELECT * FROM ${table} WHERE id = $1 AND role_id = $2`,
        [userId, 3] // role_id 3 = user
      );
      if (result.rows.length === 0) return res.status(404).json({ message: "User not found" });

      let user = result.rows[0];

      // Remove sensitive fields
      hidden.forEach(field => delete user[field]);

      res.json({
        message: "Profile Data fetch successfully",
        user
      });
    } catch (err) {
      next(err);
    }
  }
];


exports.submitKYC = [
  ...submitKYCRules,
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
