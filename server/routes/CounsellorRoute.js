const express = require("express");
const router = express.Router();
const MentalHealthForm = require("../models/mentalHealthModel");

// PUT /api/patient/predict/:id
router.put("/predict/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { predictionResult, featureImportance } = req.body;

    const updatedForm = await MentalHealthForm.findByIdAndUpdate(
      id,
      { predictionResult, featureImportance },
      { new: true }
    );

    if (!updatedForm)
      return res.status(404).json({ message: "Record not found" });

    res.json({
      message: "Prediction and feature importance saved successfully",
      data: updatedForm,
    });
  } catch (error) {
    console.error("Error saving prediction:", error);
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;
