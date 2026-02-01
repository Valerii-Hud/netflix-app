import express, { Router } from 'express';

import { isMovie } from '../middleware/content.middleware';
import {
  getByCategory,
  getDetails,
  getSimilar,
  getTrailers,
  getTrending,
} from '../controllers/content.controller';

const router: Router = express.Router();

router.use(isMovie);
router.get('/trending', getTrending);
router.get('/:id/trailers', getTrailers);
router.get('/:id/details', getDetails);
router.get('/:id/similar', getSimilar);
router.get('/:category', getByCategory);

export default router;
