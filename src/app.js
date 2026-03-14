// src/app.js - Main Express application file
// This file sets up the Express app and all middleware

// Import express framework
const express = require('express');

// Import task routes
const taskRoutes = require('./routes/taskRoutes');

// Create express application
const app = express();

// Middleware: Parse incoming JSON requests
// Without this req.body will be undefined
app.use(express.json());

// Middleware: Parse URL encoded data
app.use(express.urlencoded({ extended: true }));

// Health check endpoint
// Used by AWS and monitoring tools to check if app is running
app.get('/health', (req, res) => {
    res.status(200).json({
        status: 'healthy',
        timestamp: new Date().toISOString(),
        uptime: process.uptime()
    });
});

// Mount task routes at /tasks path
// All routes in taskRoutes will be prefixed with /tasks
app.use('/tasks', taskRoutes);

// Handle 404 - Route not found
// This runs when no other route matches
app.use((req, res) => {
    res.status(404).json({
        error: 'Route not found',
        path: req.originalUrl
    });
});

// Export app for use in server and tests
module.exports = app;