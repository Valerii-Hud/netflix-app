import type { Response } from 'express';
import { fetchData } from '../services/tmdb.service';
import isError from '../utils/helpers/isError';
import type { ContentTypeRequest } from '../types';

import { LANGUAGE } from '../config/content.config';

const getData = async (
  req: ContentTypeRequest,
  res: Response,
  url: string,
  responseKey = 'content',
  getRandomOne = false
) => {
  try {
    const data = await fetchData(`${url}?${LANGUAGE}`);

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

export const getTrending = async (req: ContentTypeRequest, res: Response) => {
  getData(req, res, `/trending/${req.typeOfContent}/day`, 'content', true);
};

export const getTrailers = async (req: ContentTypeRequest, res: Response) => {
  getData(
    req,
    res,
    `/${req.typeOfContent}/${req.params.id}/videos`,
    'trailers'
  );
};

export const getDetails = async (req: ContentTypeRequest, res: Response) => {
  getData(req, res, `/${req.typeOfContent}/${req.params.id}`);
};

export const getSimilar = async (req: ContentTypeRequest, res: Response) => {
  getData(req, res, `/${req.typeOfContent}/${req.params.id}/similar`);
};

export const getByCategory = async (req: ContentTypeRequest, res: Response) => {
  getData(req, res, `/${req.typeOfContent}/${req.params.category}`);
};
