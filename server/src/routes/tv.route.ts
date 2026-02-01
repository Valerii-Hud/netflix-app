import express, { Router } from 'express';
import {
  getByCategory,
  getDetails,
  getSimilar,
  getTrailers,
  getTrending,
} from '../controllers/content.controller';
import { isTv } from '../middleware/content.middleware';

const router: Router = express.Router();

router.use(isTv);

router.get('/trending', getTrending);
router.get('/:id/trailers', getTrailers);
router.get('/:id/details', getDetails);
router.get('/:id/similar', getSimilar);
router.get('/:category', getByCategory);

export default router;
