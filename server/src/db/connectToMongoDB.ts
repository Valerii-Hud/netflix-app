import chalk from 'chalk';
import mongoose from 'mongoose';
import { isError } from '../lib/utils';

export const connectToMongoDB = async (connection: string | undefined) => {
  try {
    if (typeof connection === 'undefined') {
      throw new Error("Connection string wasn't provided");
    }
    const conn = await mongoose.connect(connection);
    console.log(chalk.bgBlue(`MongoDB connected: ${conn.connection.host}`));
  } catch (error) {
    isError({ error, functionName: connectToMongoDB.name, handler: 'db' });
    process.exit(1);
  }
};
