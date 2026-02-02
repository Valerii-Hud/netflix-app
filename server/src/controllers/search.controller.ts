import type { Response } from 'express';
import { fetchData } from '../services/tmdb.service';
import { LANGUAGE } from '../config/content.config';
import User from '../models/user.model';
import type { AuthRequest, ContentTypeRequest } from '../types';

interface DataRequest extends AuthRequest, ContentTypeRequest {}

export const searchHelper = async (req: DataRequest, res: Response) => {
  const userId = req.user?._id;
  if (!req.typeOfRequest || req.typeOfRequest === 'default') {
    const { query } = req.params;

    const typeOfContent = req.typeOfContent;
    const response = await fetchData(
      `/search/${typeOfContent}?query=${query}&include_adult=false&${LANGUAGE}`
    );

    if (response.results.length === 0) {
      return res.status(404).send(null);
    }
    const path = response.results[0];
    await User.findByIdAndUpdate(userId, {
      $push: {
        searchHistory: {
          id: path.id,
          image: path.profile_path || path.poster_path,
          title: path.name || path.title,
          searchType: typeOfContent,
          createdAt: new Date(),
        },
      },
    });
    res.status(200).json({ content: response.results });
  }

  if (req.typeOfRequest === 'get') {
    res.status(200).json({ content: req.user?.searchHistory });
  }

  if (req.typeOfRequest === 'delete') {
    const { id } = req.params;

    await User.findByIdAndUpdate(userId, {
      $pull: {
        searchHistory: { id: Number(id) },
      },
    });
    res.status(200).json({ message: 'Item removed from search history' });
  }
};
