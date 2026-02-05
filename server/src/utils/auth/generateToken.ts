import type mongoose from 'mongoose';
import { ENV_VARS } from '../../config/env.config';
import jwt from 'jsonwebtoken';
import { MAX_TOKEN_AGE } from '../../config/auth.config';
import type { Response } from 'express';
import isError from '../helpers/isError';

const generateToken = (userId: mongoose.Types.ObjectId, res: Response) => {
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
      maxAge: MAX_TOKEN_AGE,
      sameSite: NODE_ENV === 'production' ? 'strict' : 'lax',
      secure: NODE_ENV === 'production',
    });
  } catch (error) {
    isError({ error, functionName: generateToken.name, handler: 'lib' });
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

export default generateToken;
