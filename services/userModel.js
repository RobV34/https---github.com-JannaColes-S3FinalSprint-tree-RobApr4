// userModel.js
// Description: This file contains the User model which is used to interact with the users table in the database.
const pool = require("./pg_auth_db");
const bcrypt = require("bcrypt");

class User {
  constructor(username, password, id) {
    this.username = username;
    this.password = password; // This should be a hashed password
    this.id = id;
  }

  // finding a user by username
  static async findOne({ username }) {
    const result = await pool.query("SELECT * FROM users WHERE username = $1", [
      username,
    ]);
    if (result.rows.length > 0) {
      return result.rows[0];
    } else {
      return null;
    }
  }

  // finding a user by ID
  static async findById(id) {
    const result = await pool.query("SELECT * FROM users WHERE id = $1", [id]);
    if (result.rows.length > 0) {
      return result.rows[0];
    } else {
      return null;
    }
  }

  // Method to create a new user
  static async create({
    first_name,
    last_name,
    email,
    password,
    phone_number,
    date_of_birth,
    interests,
  }) {
    // Hash the password before storing it in the database
    const hashedPassword = await bcrypt.hash(password, 10); // The number 10 here is the salt rounds

    // Assuming interests is a string of comma-separated values and should be stored as an array in the database
    const interestArray = interests
      ? interests.split(",").map((interest) => interest.trim())
      : [];

    const result = await pool.query(
      `INSERT INTO users (first_name, last_name, email, password, phone_number, date_of_birth, interests) 
       VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *`,
      [
        first_name,
        last_name,
        email,
        hashedPassword,
        phone_number,
        date_of_birth,
        interestArray,
      ]
    );
    return result.rows[0];
  }
}

module.exports = User;
