// server.js - Simplified Version
require('dotenv').config();
const express = require('express');
const cors = require('cors');
const connectDB = require('./config/database');
const applicationRoutes = require('./routes/applicationRoutes');

const app = express();

// Connect to MongoDB
connectDB();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Health check
app.get('/api/health', (req, res) => {
    res.json({
        success: true,
        message: 'Server is running!',
        timestamp: new Date().toISOString()
    });
});

// Routes
app.use('/api/applications', applicationRoutes);

// 404 handler
app.use((req, res) => {
    res.status(404).json({
        success: false,
        message: 'Route not found'
    });
});

// Error handler
app.use((err, req, res, next) => {
    console.error('Error:', err.message);
    res.status(500).json({
        success: false,
        message: err.message || 'Internal Server Error'
    });
});

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`🚀 Server running on http://localhost:${PORT}`);
    console.log(`📡 Environment: ${process.env.NODE_ENV}`);
});