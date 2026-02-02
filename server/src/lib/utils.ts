import chalk from 'chalk';
import jwt, { type JwtPayload } from 'jsonwebtoken';
import { ENV_VARS } from '../config/env.config';
import type { Response } from 'express';
import { MAX_TOKEN_AGE } from '../config/auth.config';
import type mongoose from 'mongoose';
import { response } from '../middleware/auth.middleware';
import User from '../models/user.model';

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

export const generateToken = (
  userId: mongoose.Types.ObjectId,
  res: Response
) => {
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
      httpOnly: true,
      sameSite: 'strict',
      maxAge: MAX_TOKEN_AGE,
      secure: NODE_ENV === 'production',
    });
  } catch (error) {
    isError({ error, functionName: generateToken.name, handler: 'lib' });
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

export const getUserById = async (userId: string) => {
  const user = await User.findById(userId).select('-password');
  if (!user) {
    return { user: undefined };
  }
  return { user };
};

export const verifyToken = (token: string) => {
  const { JWT_SECRET } = ENV_VARS;

  if (!token || !JWT_SECRET) {
    return { decoded: null };
  }

  const decoded = jwt.verify(token, JWT_SECRET) as JwtPayload;

  if (!decoded) {
    return { decoded: null };
  }
  return { decoded };
};
