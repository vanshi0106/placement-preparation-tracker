const mongoose = require('mongoose');

const companySchema = new mongoose.Schema({
  name: { type: String, required: true, unique: true },
  logo_url: String,
  info: String,
  jobs: [{ type: mongoose.Schema.Types.ObjectId, ref: 'PlacementDrive' }],
}, { timestamps: true });

module.exports = mongoose.model('Company', companySchema);
