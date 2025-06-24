const mongoose = require("mongoose");

const CampaignSchema = new mongoose.Schema({
  owner: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  title: { type: String, required: true },
  description: String,
  goal: { type: Number, required: true },
  amountRaised: { type: Number, default: 0 },
  image: String,
  deadline: Date,
}, { timestamps: true });

module.exports = mongoose.model("Campaign", CampaignSchema);
