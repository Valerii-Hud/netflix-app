import type { Request, Response } from 'express';
import { isError } from '../lib/utils';
import User from '../models/user.model';
import bcrypt from 'bcryptjs';

export const signup = async (req: Request, res: Response) => {
  try {
    const { userName, email, password } = req.body;

    console.log('signup');
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
export const login = async (req: Request, res: Response) => {};
export const logout = async (req: Request, res: Response) => {};
