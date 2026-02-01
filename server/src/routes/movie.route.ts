import express, { Router } from 'express';
import {
  getMovieDetails,
  getMoviesByCategory,
  getMovieTrailers,
  getSimilarMovies,
  getTrendingMovie,
} from '../controllers/movie.controller';

const router: Router = express.Router();

router.get('/trending', getTrendingMovie);
router.get('/:movieId/trailers', getMovieTrailers);
router.get('/:movieId/details', getMovieDetails);
router.get('/:movieId/similar', getSimilarMovies);
router.get('/:category', getMoviesByCategory);

export default router;
