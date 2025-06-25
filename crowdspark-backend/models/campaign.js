// models/Campaign.js
const mongoose = require('mongoose');

const campaignSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String },
  goal: { type: Number, required: true },
  category: { type: String, required: true},  // 👈 MUST be in request
}, { timestamps: true });

module.exports = mongoose.model('Campaign', campaignSchema);
