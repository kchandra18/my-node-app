// tests/tasks.test.js
// Integration tests for Task Manager API
// Tests all endpoints to ensure they work correctly

// Import supertest for making HTTP requests in tests
const request = require('supertest');

// Import the express app
const app = require('../src/app');

// Import resetTasks to restore clean state before each test
const { resetTasks } = require('../src/controllers/taskController');

// Reset tasks before each test
// Ensures tests don't affect each other
beforeEach(() => {
    resetTasks();
});

// ─────────────────────────────────────
// Health Check Tests
// ─────────────────────────────────────
describe('GET /health', () => {

    // Test health endpoint returns 200
    test('should return healthy status', async () => {
        const response = await request(app)
            .get('/health')
            .expect(200);

        expect(response.body.status).toBe('healthy');
    });
});

// ─────────────────────────────────────
// GET /tasks Tests
// ─────────────────────────────────────
describe('GET /tasks', () => {

    // Test getting all tasks returns 3 default tasks
    test('should return all tasks', async () => {
        const response = await request(app)
            .get('/tasks')
            .expect(200);

        expect(response.body.success).toBe(true);
        expect(response.body.count).toBe(3);
        expect(response.body.data).toHaveLength(3);
    });
});

// ─────────────────────────────────────
// GET /tasks/:id Tests
// ─────────────────────────────────────
describe('GET /tasks/:id', () => {

    // Test getting existing task returns correct task
    test('should return task by id', async () => {
        const response = await request(app)
            .get('/tasks/1')
            .expect(200);

        expect(response.body.success).toBe(true);
        expect(response.body.data.id).toBe(1);
        expect(response.body.data.title).toBe('Learn Git');
    });

    // Test getting non-existent task returns 404
    test('should return 404 for non-existent task', async () => {
        const response = await request(app)
            .get('/tasks/999')
            .expect(404);

        expect(response.body.success).toBe(false);
        expect(response.body.error).toContain('not found');
    });
});

// ─────────────────────────────────────
// POST /tasks Tests
// ─────────────────────────────────────
describe('POST /tasks', () => {

    // Test creating task with valid data
    test('should create a new task', async () => {
        const newTask = {
            title: 'Learn Docker',
            description: 'Learn containerization'
        };

        const response = await request(app)
            .post('/tasks')
            .send(newTask)
            .expect(201);

        expect(response.body.success).toBe(true);
        expect(response.body.data.title).toBe('Learn Docker');
        expect(response.body.data.completed).toBe(false);
    });

    // Test creating task without title returns 400
    test('should return 400 when title is missing', async () => {
        const response = await request(app)
            .post('/tasks')
            .send({ description: 'No title task' })
            .expect(400);

        expect(response.body.success).toBe(false);
        expect(response.body.error).toBe('Title is required');
    });
});

// ─────────────────────────────────────
// PUT /tasks/:id Tests
// ─────────────────────────────────────
describe('PUT /tasks/:id', () => {

    // Test updating existing task
    test('should update an existing task', async () => {
        const response = await request(app)
            .put('/tasks/1')
            .send({ completed: true })
            .expect(200);

        expect(response.body.success).toBe(true);
        expect(response.body.data.completed).toBe(true);
    });

    // Test updating non-existent task returns 404
    test('should return 404 for non-existent task', async () => {
        const response = await request(app)
            .put('/tasks/999')
            .send({ completed: true })
            .expect(404);

        expect(response.body.success).toBe(false);
    });
});

// ─────────────────────────────────────
// DELETE /tasks/:id Tests
// ─────────────────────────────────────
describe('DELETE /tasks/:id', () => {

    // Test deleting existing task
    test('should delete an existing task', async () => {
        const response = await request(app)
            .delete('/tasks/1')
            .expect(200);

        expect(response.body.success).toBe(true);
        expect(response.body.message).toContain('deleted');
    });

    // Test deleting non-existent task returns 404
    test('should return 404 for non-existent task', async () => {
        const response = await request(app)
            .delete('/tasks/999')
            .expect(404);

        expect(response.body.success).toBe(false);
    });
});