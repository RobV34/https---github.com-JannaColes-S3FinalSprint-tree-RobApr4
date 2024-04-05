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

// GET route to render the search page
router.get("/resorts/search", async (req, res) => {
  res.render("search", { resorts: undefined }); // Initially, no search has been performed
});

// GET route to handle the search request
router.get("/resorts/search-results", async (req, res) => {
  const { keyword } = req.query;
  try {
    const resorts = await resortsDAL.searchResorts(keyword); // Directly call the search function for PostgreSQL
    res.render("search", { resorts });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// POST route to create a new resort
router.post("/", async (req, res) => {
  try {
    const newResort = await resortsDAL.createResort(req.body);
    res.status(201).json(newResort);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// PUT route to update an existing resort
router.put("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const updatedResort = await resortsDAL.updateResort(id, req.body);
    if (updatedResort) {
      res.json(updatedResort);
    } else {
      res.status(404).json({ message: "Resort not found" });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// DELETE route to delete a resort
router.delete("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    await resortsDAL.deleteResort(id);
    res.status(204).send(); // No Content
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
// In this file, we have defined routes for handling CRUD operations on resorts. We use the resortsDAL service to interact with the database. The routes are defined for the following operations:
