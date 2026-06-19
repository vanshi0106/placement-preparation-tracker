const PlacementDrive = require('../models/PlacementDrive');

exports.getAll = async (req, res) => {
  try {
    const drives = await PlacementDrive.find().populate('company_id', 'name logo_url');
    res.json(drives);
  } catch (err) {
    res.status(500).json({ message: 'Server Error' });
  }
};

exports.create = async (req, res) => {
  try {
    const drive = new PlacementDrive(req.body);
    await drive.save();
    res.status(201).json(drive);
  } catch (err) {
    res.status(500).json({ message: 'Server Error' });
  }
};
