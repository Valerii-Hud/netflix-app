import express from 'express';
import chalk from 'chalk';
import cookieParser from 'cookie-parser';

import { ENV_VARS } from './config/env.config';
import authRoutes from './routes/auth.route';
import movieRoutes from './routes/movie.route';
import tvRoutes from './routes/tv.route';

import { connectToMongoDB } from './db/connectToMongoDB';
import { protectRoute } from './middleware/auth.middleware';
const app = express();
const { PORT, MONGO_URI, COOKIE_SECRET } = ENV_VARS;

app.use(express.json());
app.use(cookieParser(COOKIE_SECRET));

app.use('/api/v1/auth', authRoutes);
app.use('/api/v1/movie', protectRoute, movieRoutes);
app.use('/api/v1/tv', protectRoute, tvRoutes);

app.listen(PORT, () => {
  connectToMongoDB(MONGO_URI);
  console.log(chalk.bgBlue(`Server started at: http://localhost:${PORT}`));
});
