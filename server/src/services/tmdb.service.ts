import { ENV_VARS } from '../config/env.config';
import axiosInstance from '../lib/axios';
import isError from '../utils/helpers/isError';
interface Options {
  headers: {
    accept: 'application/json';
    Authorization: string;
  };
}

const defaultOptions: Options = {
  headers: {
    accept: 'application/json',
    Authorization: `Bearer ${ENV_VARS.TMDB_API_KEY}`,
  },
};

export const fetchData = async (url: string, options = defaultOptions) => {
  try {
    const response = await axiosInstance.get(url, options);
    return response.data;
  } catch (error) {
    isError({ error, functionName: fetchData.name, handler: 'lib' });
  }
};
