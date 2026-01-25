const express = require('express');
const cors = require('cors');
require('dotenv').config();
const bootstrap = require('./src/shared/utils/boot');

const app = express();
app.use(cors());
app.use(express.json());

// DEBUG LOGGING
app.use((req, res, next) => {
  console.log(`[IAM Service] Incoming Request: ${req.method} ${req.url}`);
  console.log('Headers:', req.headers);
  console.log('Body:', req.body);
  next();
});

// Bootstrap the application components
const { authRoutes, userRoutes } = bootstrap();
console.log('[IAM Service] Auth Routes Loaded:', !!authRoutes);
console.log('[IAM Service] User Routes Loaded:', !!userRoutes);

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/user', userRoutes);

app.get('/', (req, res) => {
  res.send('ReStart IAM Service - Clean Architecture & DDD');
});

// 404 Handler for Debugging
app.use((req, res) => {
  console.log(`[IAM Service] 404 Not Found for: ${req.method} ${req.url}`);
  res.status(404).json({ error: 'Route not found', path: req.url });
});

const PORT = process.env.IAM_PORT || 3001;
app.listen(PORT, '0.0.0.0', () => { // Listen on all interfaces
    console.log(`IAM Service ${PORT} portunda çalışıyor.`);
    console.log(`Test URL: http://localhost:${PORT}/api/auth/login`);
});
