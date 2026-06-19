const mongoose = require('mongoose');

const mockTestSchema = new mongoose.Schema({
  company_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Company' },
  title: { type: String, required: true },
  questions: [Object],
  duration: Number,
  pattern: String,
}, { timestamps: true });

module.exports = mongoose.model('MockTest', mockTestSchema);
