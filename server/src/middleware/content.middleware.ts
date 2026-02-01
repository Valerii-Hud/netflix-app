import type { NextFunction, Request, Response } from 'express';
import type { ContentTypeRequest } from '../types';

export const isMovie = (
  req: ContentTypeRequest,
  res: Response,
  next: NextFunction
) => {
  req.typeOfContent = 'movie';
  next();
};

export const isTv = (
  req: ContentTypeRequest,
  res: Response,
  next: NextFunction
) => {
  req.typeOfContent = 'tv';
  next();
};
