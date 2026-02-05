import express, { Router } from 'express';
import {
  checkAuth,
  login,
  logout,
  signup,
} from '../controllers/auth.controller';
import {
  protectRoute,
  validateUserLogin,
  validateUserSignup,
} from '../middleware/auth.middleware';

const router: Router = express.Router();

router.post('/signup', validateUserSignup, signup);
router.post('/login', validateUserLogin, login);
router.post('/logout', protectRoute, logout);
router.post('/auth-check', protectRoute, checkAuth);

export default router;
