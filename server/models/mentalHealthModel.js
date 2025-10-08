const mongoose = require("mongoose");

const formSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  age: Number,
  gender: String,
  course: String,
  year: String,
  cgpa: String,
  marital: String,
  anxiety: String,
  panic: String,
  treatment: String,
  predictionResult: { type: String }, // 🆕 to store model output
  featureImportance: { type: Object }, // 🆕 to store shap or feature impact values
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("MentalHealthForm", formSchema);
