import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import mongoose from 'mongoose';
import dotenv from 'dotenv';

import connectDB from './config/db.js';
import authRoutes from './routes/authRoutes.js';
import dashboardRoutes from './routes/dashboardRoutes.js';
import blogRoutes from './routes/blogRoutes.js';
import schoolRoutes from './routes/schoolRoutes.js';
import scholarshipRoutes from './routes/scholarshipRoutes.js';
import communityRoutes from './routes/communityRoutes.js';

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());
app.use(morgan('dev'));

// connect DB
connectDB();

app.get('/', (req, res) => res.json({ ok: true, message: 'StudyGuide backend' }));

app.use('/api/auth', authRoutes);
app.use('/api/dashboard', dashboardRoutes);
app.use('/api/blogs', blogRoutes);
app.use('/api/schools', schoolRoutes);
app.use('/api/scholarships', scholarshipRoutes);
app.use('/api/communities', communityRoutes);

// 404
app.use((req, res) => {
  res.status(404).json({ error: 'Not found' });
});

export default app;
