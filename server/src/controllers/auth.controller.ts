import type { Request, Response } from 'express';
import { generateToken, isError } from '../lib/utils';
import User from '../models/user.model';
import bcrypt from 'bcryptjs';
import { ENV_VARS } from '../config/env.config';
import type { AuthRequest } from '../types';

export const signup = async (req: Request, res: Response) => {
  try {
    const { userName, email, password } = req.body;

    const DEFAULT_PROFILE_PICTURES = [
      '/avatar1.png',
      '/avatar2.png',
      '/avatar3.png',
    ];

    const image =
      DEFAULT_PROFILE_PICTURES[
        Math.floor(Math.random() * DEFAULT_PROFILE_PICTURES.length)
      ];

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = new User({
      userName,
      email,
      image,
      password: hashedPassword,
    });

    newUser.save();

    if (!newUser) {
      throw new Error();
    }

    generateToken(newUser._id, res);
    res.status(201).json({
      _id: newUser._id,
      userName: newUser.userName,
      email: newUser.email,
      image: newUser.image,
      searchHistory: newUser.searchHistory,
    });
  } catch (error) {
    isError({ error, functionName: signup.name, handler: 'controller' });
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

export const login = async (req: AuthRequest, res: Response) => {
  try {
    const { user } = req;
    if (user?._id) {
      generateToken(user._id, res);
      res.status(200).json({
        _id: user._id,
        userName: user.userName,
        email: user.email,
        image: user.image,
        searchHistory: user.searchHistory,
      });
    }
  } catch (error) {
    isError({ error, functionName: login.name, handler: 'controller' });
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

export const logout = (req: Request, res: Response) => {
  const { NODE_ENV } = ENV_VARS;
  try {
    res.clearCookie('secure_token', {
      httpOnly: true,
      sameSite: 'strict',
      secure: NODE_ENV === 'production',
    });
    res.status(200).json({ message: 'Logged out successfully' });
  } catch (error) {
    isError({ error, functionName: logout.name, handler: 'controller' });
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

export const checkAuth = (req: AuthRequest, res: Response) => {
  try {
    res.status(200).json({ user: req.user });
  } catch (error) {
    isError({ error, functionName: checkAuth.name, handler: 'controller' });
    res.status(500).json({ error: 'Internal Server Error' });
  }
};
