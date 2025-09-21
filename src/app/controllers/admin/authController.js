// app/controllers/admin/authController.js

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

const getProfileRules = makeValidators({
    // add extra params for getting user profile data
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
            `SELECT * FROM ${table} WHERE email=$1 AND role_id=$2`,
            [email, 1] // role_id 1 = admin
        );

        if (result.rows.length === 0) return res.status(CODES.BAD_REQUEST).json({ message: "Invalid credentials" });
        
        // Fix PHP bcrypt hash
        const hashedPassword = result.rows[0].password.replace(/^\$2y\$/, "$2a$");
        const valid = await bcrypt.compare(password, hashedPassword);
        if (!valid) return res.status(CODES.BAD_REQUEST).json({ message: "Invalid credentials" });

        const token = jwt.sign(
            { id: result.rows[0].id, role: "admin" },
            process.env.JWT_SECRET,
            { expiresIn: "1h" }
        );

        res.json({ token });
    } catch (err) {
        next(err);
    }
  }
];


exports.getProfile =[
    ...getProfileRules,
    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
        return res.status(CODES.UNPROCESSABLE_ENTITY).json({ errors: errors.array() });
        }
        try {
            const adminId = req.user.id;
            const result = await pool.query(
            `SELECT * FROM ${table} WHERE id=$1 AND role_id=$2`,
            [adminId, 1]
            );

            if (result.rows.length === 0) {
            return res.status(404).json({ message: "Admin not found" });
            }

            let admin = result.rows[0];
            // Remove sensitive fields
            hidden.forEach(field => delete admin[field]);

            res.json({
            message: "Profile data fetched successfully",
            admin
            });
        } catch (err) {
            next(err);
        }
    }
];