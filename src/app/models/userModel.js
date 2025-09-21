// app/models/reportModel.js

const table = "users";

// Fields you never want to expose
const hidden = [
  "password",
  "remember_token",
  "otpverify",
  "device_id"
];

// Fields you want to protect from updates manualy
const protectedFields = [
  "id",
  "role_id",
  "created_at",
  "updated_at"
];

module.exports = { table, hidden, protectedFields };
