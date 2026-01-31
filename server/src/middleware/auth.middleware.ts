import type { NextFunction, Request, Response } from 'express';
import User from '../models/user.model';
import { isError } from '../lib/utils';
import validator from 'validator';
import {
  MAX_USERNAME_LENGTH,
  MIN_PASSWORD_LENGTH,
  MIN_USERNAME_LENGTH,
  userNameRegex,
} from '../config/auth.config';

const isValidUserName = (userName: string) => {
  return userNameRegex.test(userName);
};

const isUserExists = async (key: 'userName' | 'email', value: string) => {
  const userExists = await User.findOne({ [key]: value });
  return Boolean(userExists);
};

export const validateUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { userName, email, password } = req.body;

    const trimmedUserName = userName && userName.trim();
    const trimmedEmail = email && email.trim();
    const trimmedPassword = password && password.trim();

    const response = (
      errorMessage: string,
      statusCode: 400 | 401 | 500 = 400
    ) => {
      res.status(statusCode).json({ error: errorMessage });
      return { errorMessage, statusCode };
    };

    if (!trimmedUserName || !trimmedEmail || !trimmedPassword) {
      return response('All fields are required.');
    }

    const fetchedByEmail = await isUserExists('email', trimmedEmail);
    const fetchedByUserName = await isUserExists('userName', trimmedUserName);

    if (fetchedByEmail) {
      return response('User with this email already exists.');
    }

    if (fetchedByUserName) {
      return response('User with this username already exists.');
    }

    const isUserNameCorrect = isValidUserName(trimmedUserName);

    if (!isUserNameCorrect) {
      return response('Username must be lowercase.');
    }

    if (trimmedPassword.length < MIN_PASSWORD_LENGTH) {
      return response(
        `Password must be at least ${MIN_PASSWORD_LENGTH} chars.`
      );
    }

    if (
      trimmedUserName.length < MIN_USERNAME_LENGTH ||
      trimmedUserName.length > MAX_USERNAME_LENGTH
    ) {
      return response(
        `Username must be from ${MIN_USERNAME_LENGTH} to ${MAX_USERNAME_LENGTH} chars.`
      );
    }

    if (!validator.isEmail(trimmedEmail)) {
      return response('Email is incorrect.');
    }

    next();
  } catch (error) {
    isError({ error, functionName: validateUser.name, handler: 'middleware' });
    res.status(500).json({ error: 'Internal Server Error' });
  }
};
