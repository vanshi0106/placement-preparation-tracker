const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, enum: ['student', 'admin', 'tpo'], default: 'student' },
  contact: { type: String },
  resume_links: [String],
  placement_info: {
    company: String,
    job_role: String,
    status: String,
  },
}, { timestamps: true });

module.exports = mongoose.model('User', userSchema);
