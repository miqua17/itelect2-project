import express from 'express';
import { mockTasks, createTask, mergeTaskUpdate } from '../utils.js';
import { fetchSampleUsers } from '../api.js';

const router = express.Router();

let cachedUsers = [];

export function setCachedUsers(users) {
    cachedUsers = users;
}

// GET all tasks
router.get('/tasks', (req, res) => {
    res.json(mockTasks);
});

// GET single task by ID
router.get('/tasks/:id', (req, res) => {
    const taskId = Number(req.params.id);
    const task = mockTasks.find(t => t.id === taskId);

    if (!task) {
        return res.status(404).json({ error: `Task with id ${req.params.id} not found` });
    }

    res.json(task);
});

// POST new task
router.post('/tasks', (req, res) => {
    try {
        const newTask = createTask(req.body);
        mockTasks.push(newTask);
        res.status(201).json(newTask);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

// PUT update task by ID
router.put('/tasks/:id', (req, res) => {
    const taskId = Number(req.params.id);
    const taskIndex = mockTasks.findIndex(t => t.id === taskId);

    if (taskIndex === -1) {
        return res.status(404).json({ error: `Task with id ${req.params.id} not found` });
    }

    const updatedTask = mergeTaskUpdate(mockTasks[taskIndex], req.body);
    mockTasks[taskIndex] = updatedTask;

    res.json(updatedTask);
});

// DELETE task by ID
router.delete('/tasks/:id', (req, res) => {
    const taskId = Number(req.params.id);
    const taskIndex = mockTasks.findIndex(t => t.id === taskId);

    if (taskIndex === -1) {
        return res.status(404).json({ error: `Task with id ${req.params.id} not found` });
    }

    // Remove 1 task at taskIndex from mockTasks
    const [deletedTask] = mockTasks.splice(taskIndex, 1);
    res.json(deletedTask);
});

// GET cached users
router.get('/users', (req, res) => {
    res.json(cachedUsers);
});

export default router;