import express, { Router } from 'express';
import { login, logout, signup } from '../controllers/auth.controller';
import {
  validateUserLogin,
  validateUserSignup,
} from '../middleware/auth.middleware';

const router: Router = express.Router();

router.post('/signup', validateUserSignup, signup);
router.post('/login', validateUserLogin, login);
router.post('/logout', logout);

export default router;
