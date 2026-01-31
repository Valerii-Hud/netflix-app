import chalk from 'chalk';
import jwt, { type JwtPayload } from 'jsonwebtoken';
import { ENV_VARS } from '../config/env.config';
import type { Response } from 'express';

interface ErrorHandler {
  error: unknown;
  functionName: string;
  handler: 'controller' | 'lib' | 'route' | 'db' | 'middleware';
}

export const isError = ({ error, functionName, handler }: ErrorHandler) => {
  const isRegularError = error instanceof Error;
  if (isRegularError) {
    console.log(
      chalk.bgRed(`Error on ${functionName} ${handler}: ${error.message}`)
    );
  }
  return isRegularError;
};

export const generateToken = (userId: string, res: Response) => {
  try {
    const { JWT_SECRET, NODE_ENV } = ENV_VARS;

    if (!JWT_SECRET || typeof JWT_SECRET !== 'string') {
      return res.status(401).json({ error: 'No Token Provided' });
    }

    const token = jwt.sign({ userId }, JWT_SECRET, {
      algorithm: 'HS256',
      expiresIn: '14d',
    });

    res.cookie('secret_token', token, {
      maxAge: 14 * 24 * 60 * 60 * 1000,
      httpOnly: true,
      secure: NODE_ENV === 'production',
    });
  } catch (error) {
    isError({ error, functionName: generateToken.name, handler: 'lib' });
    res.status(500).json({ error: 'Internal Server Error' });
  }
};
