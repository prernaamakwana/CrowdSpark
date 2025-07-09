const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  username: { type: String },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: {
    type: String,
    enum: ["admin", "user"],
    default: "user"
  },
  bookmarks: [{ type: mongoose.Schema.Types.ObjectId, ref: "Campaign" }]
}, { timestamps: true });

// ✅ Keep only the extra index
userSchema.index({ role: 1 }); // This one’s good to keep

module.exports = mongoose.models.User || mongoose.model("User", userSchema);