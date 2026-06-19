const CodingProblem = require('../models/CodingProblem');

exports.list = async (req, res) => {
  try {
    const { difficulty, tag } = req.query;
    let query = {};
    if (difficulty) query.difficulty = difficulty;
    if (tag) query.company_tags = tag;
    const problems = await CodingProblem.find(query).select('title difficulty company_tags createdAt');
    res.json(problems);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};

exports.getById = async (req, res) => {
  try {
    const problem = await CodingProblem.findById(req.params.id);
    if (!problem) return res.status(404).json({ message: 'Not found' });
    res.json(problem);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};

exports.create = async (req, res) => {
  try {
    const problem = new CodingProblem(req.body);
    await problem.save();
    res.status(201).json(problem);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};
