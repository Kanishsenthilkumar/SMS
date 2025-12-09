require('dotenv').config();
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const connectDB = require('./config/db');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Connect to MongoDB
connectDB();

// Healthcheck route
app.get('/api/health', (req, res) => {
  const state = mongoose.connection.readyState;
  // 0: disconnected, 1: connected, 2: connecting, 3: disconnecting
  const dbStatusMap = {
    0: 'disconnected',
    1: 'connected',
    2: 'connecting',
    3: 'disconnecting',
  };

  const dbStatus = dbStatusMap[state] || 'unknown';

  const isHealthy = dbStatus === 'connected';

  res.status(isHealthy ? 200 : 500).json({
    status: isHealthy ? 'ok' : 'error',
    db: dbStatus,
  });
});

// Other routes
app.use('/api/admin/announcements', require('./routes/adminAnnouncements'));
app.use('/api/announcements', require('./routes/publicAnnouncements'));

// Student routes
app.use('/api/admin/students', require('./routes/adminStudents'));
app.use('/api/students', require('./routes/students'));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
