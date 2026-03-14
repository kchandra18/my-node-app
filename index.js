// index.js - Server entry point
// This file starts the Express server
// Kept separate from app.js so we can test app without starting server

/* eslint-disable no-console */

// Import the express app
const app = require('./src/app');

// Define port - use environment variable or default to 3000
// process.env.PORT allows AWS/hosting to set the port
const PORT = process.env.PORT || 3000;

// Start the server and listen for incoming requests
app.listen(PORT, () => {
    console.log(`🚀 Server is running on port ${PORT}`);
    console.log(`📋 Health check: http://localhost:${PORT}/health`);
    console.log(`📝 Tasks API: http://localhost:${PORT}/tasks`);
});