import 'dotenv/config';
import express from 'express';
import taskRoutes from './routes/tasks.js';
import authRoutes from './routes/auth.js';

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

// Mount routers
app.use('/api', taskRoutes);
app.use('/api/auth', authRoutes);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});