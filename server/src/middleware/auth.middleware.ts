import type { NextFunction, Request, Response } from 'express';
import User from '../models/user.model';
import getUserById from '../repositories/user/getUserById';
import isError from '../utils/helpers/isError';
import validator from 'validator';
import {
  MAX_USERNAME_LENGTH,
  MIN_PASSWORD_LENGTH,
  MIN_USERNAME_LENGTH,
  userNameRegex,
} from '../config/auth.config';
import bcrypt from 'bcryptjs';
import type { AuthRequest } from '../types';
import verifyToken from '../utils/auth/verifyToken';

const isValidUserName = (userName: string) => {
  return userNameRegex.test(userName);
};

const isUserExists = async (key: 'userName' | 'email', value: string) => {
  const userExists = await User.findOne({ [key]: value });
  return Boolean(userExists);
};

const isPasswordCorrect = async (
  userPassword: string,
  passwordHash: string | undefined
) => {
  if (passwordHash === undefined) {
    return { error: 'User has not hash password' };
  }
  const isCorrect = await bcrypt.compare(userPassword, passwordHash);
  return { correct: isCorrect };
};

export const response = (
  res: Response,
  errorMessage: string,
  statusCode: 400 | 401 | 404 | 500 = 400
) => {
  res.status(statusCode).json({ error: errorMessage });
  return { errorMessage, statusCode };
};

export const validateUserSignup = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { userName, email, password } = req.body;

    const trimmedUserName = userName && userName.trim();
    const trimmedEmail = email && email.trim();
    const trimmedPassword = password && password.trim();

    if (!trimmedUserName || !trimmedEmail || !trimmedPassword) {
      return response(res, 'All fields are required.');
    }

    const fetchedByEmail = await isUserExists('email', trimmedEmail);
    const fetchedByUserName = await isUserExists('userName', trimmedUserName);

    if (fetchedByEmail) {
      return response(res, 'User with this email already exists.');
    }

    if (fetchedByUserName) {
      return response(res, 'User with this username already exists.');
    }

    const isUserNameCorrect = isValidUserName(trimmedUserName);

    if (!isUserNameCorrect) {
      return response(res, 'Username must be lowercase.');
    }

    if (trimmedPassword.length < MIN_PASSWORD_LENGTH) {
      return response(
        res,
        `Password must be at least ${MIN_PASSWORD_LENGTH} chars.`
      );
    }

    if (
      trimmedUserName.length < MIN_USERNAME_LENGTH ||
      trimmedUserName.length > MAX_USERNAME_LENGTH
    ) {
      return response(
        res,
        `Username must be from ${MIN_USERNAME_LENGTH} to ${MAX_USERNAME_LENGTH} chars.`
      );
    }

    if (!validator.isEmail(trimmedEmail)) {
      return response(res, 'Email is incorrect.');
    }

    next();
  } catch (error) {
    isError({
      error,
      functionName: validateUserSignup.name,
      handler: 'middleware',
    });
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

export const validateUserLogin = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const { email, password } = req.body;

    const trimmedEmail = email.trim();
    const trimmedPassword = password.trim();

    if (!trimmedEmail || !trimmedPassword) {
      return response(res, 'Invalid credentials.');
    }

    const fetchedByEmail = await isUserExists('email', trimmedEmail);

    if (!fetchedByEmail) {
      return response(res, 'Invalid credentials.', 404);
    }

    const user = await User.findOne({ email: trimmedEmail });

    const { correct: passwordCorrect, error: passwordCheckError } =
      await isPasswordCorrect(trimmedPassword, user?.password);

    if (passwordCheckError || !passwordCorrect || !user?._id) {
      return response(res, 'Invalid credentials.', 401);
    }
    req.user = user;
    next();
  } catch (error) {
    isError({
      error,
      functionName: validateUserLogin.name,
      handler: 'middleware',
    });
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

export const protectRoute = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const token = req.cookies['secret_token'];

    const { decoded } = verifyToken(token);

    if (!decoded || !decoded.userId) {
      return response(res, 'Unauthorized - Invalid Token Provided', 401);
    }

    const { user } = await getUserById(decoded.userId);
    if (!user) {
      return response(res, 'User not found', 404);
    }
    req.user = user;

    next();
  } catch (error) {
    isError({
      error,
      functionName: protectRoute.name,
      handler: 'middleware',
    });
    res.status(500).json({ error: 'Internal Server Error' });
  }
};
