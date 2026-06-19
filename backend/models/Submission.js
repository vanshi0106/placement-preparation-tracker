const mongoose = require('mongoose');

const submissionSchema = new mongoose.Schema({
  user_id: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  test_id: { type: mongoose.Schema.Types.ObjectId },
  answers: [Object],
  score: Number,
  time_taken: Number,
}, { timestamps: true });

module.exports = mongoose.model('Submission', submissionSchema);
