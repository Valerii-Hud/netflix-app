import type { Request, Response } from 'express';
import { fetchData } from '../services/tmdb.service';
import { isError } from '../lib/utils';

const LANGUAGE = '?language=en-US';

const getData = async (
  req: Request,
  res: Response,
  url: string,
  responseKey = 'content',
  getRandomOne = false
) => {
  try {
    const data = await fetchData(`${url}${LANGUAGE}`);

    res.status(200).json({
      [responseKey]: getRandomOne
        ? data.results[Math.floor(Math.random() * data.results?.length)]
        : data.results
        ? data.results
        : data,
    });
  } catch (error) {
    if (error instanceof Error && error.message.includes('404')) {
      return res.status(404).send(null);
    }
    isError({
      error,
      functionName: getData.name,
      handler: 'controller',
    });
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

export const getTrendingMovie = async (req: Request, res: Response) => {
  getData(req, res, '/trending/movie/day', 'content', true);
};

export const getMovieTrailers = async (req: Request, res: Response) => {
  getData(req, res, `/movie/${req.params.movieId}/videos`, 'trailers');
};

export const getMovieDetails = async (req: Request, res: Response) => {
  getData(req, res, `/movie/${req.params.movieId}`);
};

export const getSimilarMovies = async (req: Request, res: Response) => {
  getData(req, res, `/movie/${req.params.movieId}/similar`);
};

export const getMoviesByCategory = async (req: Request, res: Response) => {
  getData(req, res, `/movie/${req.params.category}`);
};
