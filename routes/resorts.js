// routes/resorts.js
const express = require("express");
const router = express.Router();
const resortsDAL = require("../services/pg.resorts.dal");

router.get("/", async (req, res) => {
  try {
    const allResorts = await resortsDAL.getAllResorts(); // Retrieves data from the database
    // Render the EJS view and pass the resorts data to it
    res.render("resorts-list", { resorts: allResorts });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// More route handlers (POST, PUT, DELETE) go here using resortsDAL functions

module.exports = router;
