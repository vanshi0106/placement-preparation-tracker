const mongoose = require('mongoose');

const placementDriveSchema = new mongoose.Schema({
  company_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Company', required: true },
  job_title: { type: String, required: true },
  job_desc: String,
  eligibility: Object,
  date: Date,
  package: String,
  applicants: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
}, { timestamps: true });

module.exports = mongoose.model('PlacementDrive', placementDriveSchema);
