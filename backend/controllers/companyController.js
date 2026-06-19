const Company = require('../models/Company');

exports.getAll = async (req, res) => {
  try {
    const companies = await Company.find().select('name logo_url info createdAt');
    res.json(companies);
  } catch (err) {
    res.status(500).json({ message: 'Server Error' });
  }
};

exports.create = async (req, res) => {
  const { name, logo_url, info } = req.body;
  try {
    const company = new Company({ name, logo_url, info });
    await company.save();
    res.status(201).json(company);
  } catch (err) {
    res.status(500).json({ message: 'Server Error' });
  }
};
