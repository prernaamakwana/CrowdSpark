const mongoose = require('mongoose');

const commentSchema = new mongoose.Schema(
  {
    campaignId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Campaign',
      required: true,
    },
    user: {
      type: String, 
      required: true,
      default: 'Guest',
    },
    text: {
      type: String,
      required: true,
      trim: true,
    },
  },
  {
    timestamps: true, 
  }
);

module.exports = mongoose.model('Comment', commentSchema);
