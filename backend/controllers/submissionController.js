const Submission = require('../models/Submission');
const MockTest = require('../models/MockTest');

exports.create = async (req, res) => {
  try {
    const { test_id, answers, time_taken } = req.body;
    let score = null;

    if (test_id && Array.isArray(answers)) {
      const test = await MockTest.findById(test_id);
      if (test?.questions?.length) {
        const key = test.questions.map(q => q.correct_answer);
        score = answers.reduce((acc, a, i) => (a === key[i] ? acc + 1 : acc), 0);
      }
    }

    const submission = new Submission({
      user_id: req.user.id,
      test_id,
      answers,
      score,
      time_taken: time_taken || null,
    });

    await submission.save();
    res.status(201).json(submission);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};

exports.mine = async (req, res) => {
  try {
    const submissions = await Submission.find({ user_id: req.user.id }).sort({ createdAt: -1 });
    res.json(submissions);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};
