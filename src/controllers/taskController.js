// src/controllers/taskController.js
// Controller handles all task business logic
// Separating logic from routes is best practice!

// In-memory storage for tasks
// In real world this would be a database (MongoDB, PostgreSQL)
let tasks = [
    {
        id: 1,
        title: 'Learn Git',
        description: 'Complete Git basics course',
        completed: true
    },
    {
        id: 2,
        title: 'Learn GitHub Actions',
        description: 'Build CI/CD pipeline',
        completed: true
    },
    {
        id: 3,
        title: 'Deploy to AWS',
        description: 'Deploy app to AWS EC2',
        completed: false
    }
];

// Counter for generating unique IDs
let nextId = 4;

// GET /tasks - Get all tasks
const getAllTasks = (req, res) => {
    res.status(200).json({
        success: true,
        count: tasks.length,
        data: tasks
    });
};

// GET /tasks/:id - Get single task by ID
const getTaskById = (req, res) => {
    // Convert string ID from URL to number
    const id = parseInt(req.params.id);

    // Find task with matching ID
    const task = tasks.find(t => t.id === id);

    // If task not found return 404
    if (!task) {
        return res.status(404).json({
            success: false,
            error: `Task with id ${id} not found`
        });
    }

    // Return found task
    res.status(200).json({
        success: true,
        data: task
    });
};

// POST /tasks - Create new task
const createTask = (req, res) => {
    // Destructure title and description from request body
    const { title, description } = req.body;

    // Validate required fields
    if (!title) {
        return res.status(400).json({
            success: false,
            error: 'Title is required'
        });
    }

    // Create new task object
    const newTask = {
        id: nextId++,
        title,
        description: description || '',
        completed: false
    };

    // Add to tasks array
    tasks.push(newTask);

    // Return created task with 201 status
    res.status(201).json({
        success: true,
        data: newTask
    });
};

// PUT /tasks/:id - Update existing task
const updateTask = (req, res) => {
    // Convert string ID from URL to number
    const id = parseInt(req.params.id);

    // Find index of task with matching ID
    const index = tasks.findIndex(t => t.id === id);

    // If task not found return 404
    if (index === -1) {
        return res.status(404).json({
            success: false,
            error: `Task with id ${id} not found`
        });
    }

    // Update task with new values
    // Keep existing values if not provided in request
    tasks[index] = {
        ...tasks[index],
        ...req.body,
        id
    };

    // Return updated task
    res.status(200).json({
        success: true,
        data: tasks[index]
    });
};

// DELETE /tasks/:id - Delete task
const deleteTask = (req, res) => {
    // Convert string ID from URL to number
    const id = parseInt(req.params.id);

    // Find index of task with matching ID
    const index = tasks.findIndex(t => t.id === id);

    // If task not found return 404
    if (index === -1) {
        return res.status(404).json({
            success: false,
            error: `Task with id ${id} not found`
        });
    }

    // Remove task from array
    tasks.splice(index, 1);

    // Return success with no content
    res.status(200).json({
        success: true,
        message: `Task ${id} deleted successfully`
    });
};

// Reset tasks - used for testing only
const resetTasks = () => {
    tasks = [
        {
            id: 1,
            title: 'Learn Git',
            description: 'Complete Git basics course',
            completed: true
        },
        {
            id: 2,
            title: 'Learn GitHub Actions',
            description: 'Build CI/CD pipeline',
            completed: true
        },
        {
            id: 3,
            title: 'Deploy to AWS',
            description: 'Deploy app to AWS EC2',
            completed: false
        }
    ];
    nextId = 4;
};

// Export all controller functions
module.exports = {
    getAllTasks,
    getTaskById,
    createTask,
    updateTask,
    deleteTask,
    resetTasks
};