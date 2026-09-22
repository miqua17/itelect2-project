import express from 'express';
import db from '../models/index.cjs';
import { verifyToken, requireRole } from '../middleware/verifyToken.js';

const { Task, User } = db;
const router = express.Router();

// GET /tasks
router.get('/tasks', async (req, res) => {
  const tasks = await Task.findAll({ include: User, order: [['id', 'ASC']] });
  res.json(tasks);
});

// GET /tasks/:id
router.get('/tasks/:id', async (req, res) => {
  const task = await Task.findByPk(req.params.id, { include: User });
  if (!task) {
    return res.status(404).json({ error: `Task with id ${req.params.id} not found` });
  }
  res.json(task);
});

// POST /tasks (Protected)
router.post('/tasks', verifyToken, async (req, res) => {
  const task = await Task.create(req.body);
  res.status(201).json(task);
});

// PUT /tasks/:id (Protected)
router.put('/tasks/:id', verifyToken, async (req, res) => {
  const task = await Task.findByPk(req.params.id);
  if (!task) {
    return res.status(404).json({ error: `Task with id ${req.params.id} not found` });
  }
  await task.update(req.body);
  res.json(task);
});

// DELETE /tasks/:id (Protected + Admin required)
router.delete('/tasks/:id', verifyToken, requireRole('admin'), async (req, res) => {
  const task = await Task.findByPk(req.params.id);
  if (!task) {
    return res.status(404).json({ error: `Task with id ${req.params.id} not found` });
  }
  await task.destroy();
  res.status(200).json({ message: 'Task deleted', task });
});

// GET /users
router.get('/users', async (req, res) => {
  const users = await User.findAll({ include: Task, order: [['id', 'ASC']] });
  res.json(users);
});

export default router;