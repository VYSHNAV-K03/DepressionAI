const express = require("express");
const router = express.Router();
const MentalHealthForm = require("../models/mentalHealthModel");
const userModel = require("../models/userModel");

// @route   POST /api/forms
// @desc    Save student mental health form
// @access  Private (for logged-in students)
router.post("/form", async (req, res) => {
  try {
    const {
      userId,
      age,
      gender,
      course,
      year,
      cgpa,
      marital,
      anxiety,
      panic,
      treatment,
    } = req.body;

    if (!userId) {
      return res.status(400).json({ message: "User ID is required" });
    }

    console.log(req.body);

    const newForm = new MentalHealthForm({
      userId,
      age,
      gender,
      course,
      year,
      cgpa,
      marital,
      anxiety,
      panic,
      treatment,
    });

    await newForm.save();

    res.status(201).json({
      message: "Form submitted successfully",
      data: newForm,
    });
  } catch (error) {
    console.error("Error saving form:", error);
    res.status(500).json({ message: "Server error" });
  }
});

router.get("/get", async (req, res) => {
  try {
    // Fetch all users with role "student"
    const users = await userModel
      .find({ role: "patient" })
      .select("username phone");
    res.status(200).json(users);
  } catch (error) {
    console.error("Error fetching users:", error);
    res.status(500).json({ message: "Server error" });
  }
});

// Get student form by user ID and populate user details
router.get("/:id", async (req, res) => {
  try {
    const student = await MentalHealthForm.findOne({ userId: req.params.id })
      .sort({ createdAt: -1 }) // sort by newest first
      .populate("userId", "username phone email");

    if (!student) return res.status(404).json({ message: "Student not found" });

    res.status(200).json(student);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;
