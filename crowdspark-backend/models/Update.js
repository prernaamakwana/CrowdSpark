const mongoose = require('mongoose');

const updateSchema = new mongoose.Schema({
  campaignId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'Campaign',
  },
  title: {
    type: String,
    default: '', // Optional title for the update
  },
  message: {
    type: String,
    required: true,
  }
}, { timestamps: true }); // Adds createdAt & updatedAt

module.exports = mongoose.model('Update', updateSchema);
