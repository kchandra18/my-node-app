// src/routes/taskRoutes.js
// Routes define the API endpoints and connect them to controllers
// Keeping routes separate from controllers is best practice!

// Import express router
const express = require('express');

// Create router instance
const router = express.Router();

// Import all controller functions
const {
    getAllTasks,
    getTaskById,
    createTask,
    updateTask,
    deleteTask
} = require('../controllers/taskController');

// Define routes and map them to controller functions

// GET /tasks - Get all tasks
// Example: GET http://localhost:3000/tasks
router.get('/', getAllTasks);

// GET /tasks/:id - Get single task by ID
// Example: GET http://localhost:3000/tasks/1
router.get('/:id', getTaskById);

// POST /tasks - Create new task
// Example: POST http://localhost:3000/tasks
// Body: { "title": "New Task", "description": "Task description" }
router.post('/', createTask);

// PUT /tasks/:id - Update existing task
// Example: PUT http://localhost:3000/tasks/1
// Body: { "completed": true }
router.put('/:id', updateTask);

// DELETE /tasks/:id - Delete task
// Example: DELETE http://localhost:3000/tasks/1
router.delete('/:id', deleteTask);

// Export router
module.exports = router;