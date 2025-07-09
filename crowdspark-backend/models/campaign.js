const mongoose = require('mongoose');

const campaignSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String },
  goal: { type: Number, required: true },
  category: { type: String, required: true },
  endDate: { type: Date, required: true },
  createdAt: { type: Date, default: Date.now },

  // ✅ Add this field for population to work
  creator: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true
  }
});

module.exports = mongoose.model('Campaign', campaignSchema);