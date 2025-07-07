const mongoose = require('mongoose');

const updateSchema = new mongoose.Schema({
  campaignId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'Campaign',
  },
  title: {
    type: String,
    default: '', 
  },
  message: {
    type: String,
    required: true,
  }
}, { timestamps: true }); 
module.exports = mongoose.model('Update', updateSchema);
