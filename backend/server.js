require('dotenv').config();
const express = require('express');
const connectDB = require('./config/db');
const cors = require('cors');

const app = express();
connectDB();

app.use(cors({
  origin: 'http://localhost:3000',  // ✅ Specific origin
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

app.use(express.json());

// Routes
app.use('/api/auth', require('./routes/auth'));
app.use('/api/users', require('./routes/users'));
app.use('/api/companies', require('./routes/companies'));
app.use('/api/placementdrives', require('./routes/placementdrives'));
app.use('/api/mocktests', require('./routes/mocktests'));
app.use('/api/codingproblems', require('./routes/codingproblems'));
app.use('/api/submissions', require('./routes/submissions'));
app.use('/api/resumes', require('./routes/resumes'));

app.get('/', (req, res) => res.send('API running'));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
