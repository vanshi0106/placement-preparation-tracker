const Resume = require('../models/Resume');

exports.upsertMine = async (req, res) => {
  try {
    const payload = {
      sections: req.body.sections || {},
      job_desc: req.body.job_desc || '',
      match_score: req.body.match_score || null,
      suggestions: req.body.suggestions || [],
      export_url: req.body.export_url || null,
    };
    const resume = await Resume.findOneAndUpdate(
      { user_id: req.user.id },
      { $set: payload, user_id: req.user.id },
      { new: true, upsert: true }
    );
    res.status(200).json(resume);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};

exports.getMine = async (req, res) => {
  try {
    const resume = await Resume.findOne({ user_id: req.user.id });
    if (!resume) return res.status(404).json({ message: 'Resume not found' });
    res.json(resume);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};
