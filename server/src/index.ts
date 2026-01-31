import express from 'express';
import chalk from 'chalk';
import cookieParser from 'cookie-parser';

import { ENV_VARS } from './config/env.config';
import authRoutes from './routes/auth.route';
import { connectToMongoDB } from './db/connectToMongoDB';

const app = express();
const { PORT, MONGO_URI, COOKIE_SECRET } = ENV_VARS;

app.use(express.json());
app.use(cookieParser(COOKIE_SECRET));
app.use('/api/v1/auth', authRoutes);

app.listen(PORT, () => {
  connectToMongoDB(MONGO_URI);
  console.log(chalk.bgBlue(`Server started at: http://localhost:${PORT}`));
});
