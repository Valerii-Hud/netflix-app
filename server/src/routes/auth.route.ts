import express, { Router } from 'express';
import { login, logout, signup } from '../controllers/auth.controller';
import { validateUser } from '../middleware/auth.middleware';

const router: Router = express.Router();

router.post('/signup', validateUser, signup);
router.post('/login', login);
router.post('/logout', logout);

export default router;
