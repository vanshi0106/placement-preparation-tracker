const mongoose = require('mongoose');

const codingProblemSchema = new mongoose.Schema({
  company_tags: [String],
  title: { type: String, required: true },
  description: String,
  difficulty: { type: String, enum: ['Easy', 'Medium', 'Hard'] },
  test_cases: [Object],
}, { timestamps: true });

module.exports = mongoose.model('CodingProblem', codingProblemSchema);
