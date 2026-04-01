const express = require("express");
const router = express.Router();
const Credential = require("../models/Credential");

// CREATE: POST /api/credentials
router.post("/", async (req, res) => {
  try {
    const { website, username, password } = req.body;

    if (!website || !username || !password) {
      return res.status(400).json({ message: "All fields are required." });
    }

    const created = await Credential.create({ website, username, password });
    res.status(201).json(created);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// READ ALL: GET /api/credentials
router.get("/", async (req, res) => {
  try {
    const items = await Credential.find().sort({ createdAt: -1 });
    res.json(items);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// READ ONE: GET /api/credentials/:id
router.get("/:id", async (req, res) => {
  try {
    const item = await Credential.findById(req.params.id);
    if (!item) return res.status(404).json({ message: "Not found" });
    res.json(item);
  } catch {
    res.status(400).json({ message: "Invalid id" });
  }
});

// UPDATE: PUT /api/credentials/:id
router.put("/:id", async (req, res) => {
  try {
    const { website, username, password } = req.body;

    if (!website || !username || !password) {
      return res.status(400).json({ message: "All fields are required." });
    }

    const updated = await Credential.findByIdAndUpdate(
      req.params.id,
      { website, username, password },
      { new: true, runValidators: true }
    );

    if (!updated) return res.status(404).json({ message: "Not found" });
    res.json(updated);
  } catch {
    res.status(400).json({ message: "Invalid request" });
  }
});

// DELETE: DELETE /api/credentials/:id
router.delete("/:id", async (req, res) => {
  try {
    const deleted = await Credential.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ message: "Not found" });
    res.json({ message: "Deleted" });
  } catch {
    res.status(400).json({ message: "Invalid id" });
  }
});

module.exports = router;

