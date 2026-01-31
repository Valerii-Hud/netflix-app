import dotenv from 'dotenv';

dotenv.config({});

interface EnvironmentVariables {
  MONGO_URI: string | undefined;
  JWT_SECRET: string | undefined;
  NODE_ENV: string;
  PORT: number;
  COOKIE_SECRET: string;
}

export const ENV_VARS: EnvironmentVariables = {
  MONGO_URI: process.env.MONGO_URI,
  JWT_SECRET: process.env.JWT_SECRET,
  PORT: Number(process.env.PORT) || 5000,
  NODE_ENV: process.env.NODE_ENV || 'production',
  COOKIE_SECRET: process.env.COOKIE_SECRET || '',
};
