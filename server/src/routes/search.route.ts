import express, { Router } from 'express';
import { searchHelper } from '../controllers/search.controller';
import { isDelete, isGet, isPerson } from '../middleware/search.middleware';
import { isMovie, isTv } from '../middleware/content.middleware';

const router: Router = express.Router();

router.get('/person/:query', isPerson, searchHelper);
router.get('/movie/:query', isMovie, searchHelper);
router.get('/tv/:query', isTv, searchHelper);

router.get('/history', isGet, searchHelper);
router.delete('/history/:id', isDelete, searchHelper);
export default router;
