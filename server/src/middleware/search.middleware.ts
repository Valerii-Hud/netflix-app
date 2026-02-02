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

export const isPerson = (
  req: ContentTypeRequest,
  res: Response,
  next: NextFunction
) => {
  req.typeOfContent = 'person';
  next();
};

export const isGet = (
  req: ContentTypeRequest,
  res: Response,
  next: NextFunction
) => {
  req.typeOfRequest = 'get';
  next();
};

export const isDelete = (
  req: ContentTypeRequest,
  res: Response,
  next: NextFunction
) => {
  req.typeOfRequest = 'delete';
  next();
};

export const isDefault = (
  req: ContentTypeRequest,
  res: Response,
  next: NextFunction
) => {
  req.typeOfRequest = 'delete';
  next();
};
