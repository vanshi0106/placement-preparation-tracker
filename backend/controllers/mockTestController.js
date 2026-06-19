const MockTest = require('../models/MockTest');

exports.list = async (req, res) => {
  try {
    const tests = await MockTest.find().select('title duration company_id createdAt');
    res.json(tests);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};

exports.getById = async (req, res) => {
  try {
    const test = await MockTest.findById(req.params.id);
    if (!test) return res.status(404).json({ message: 'Not found' });
    res.json(test);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};

exports.create = async (req, res) => {
  try {
    const test = new MockTest(req.body);
    await test.save();
    res.status(201).json(test);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};
