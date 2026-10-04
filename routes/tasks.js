import express from 'express';
import { verifyToken, requireRole } from '../middleware/verifyToken.js';
import {
  getTasks,
  getTaskById,
  createTask,
  updateTask,
  deleteTask,
  getUsers,
} from '../controllers/taskController.js';

const router = express.Router();

router.get('/tasks', getTasks);
router.get('/tasks/:id', getTaskById);
router.post('/tasks', verifyToken, createTask);
router.put('/tasks/:id', verifyToken, updateTask);
router.delete('/tasks/:id', verifyToken, requireRole('admin'), deleteTask);
router.get('/users', getUsers);

export default router;