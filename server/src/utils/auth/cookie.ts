import type { Response } from 'express';
import { ENV_VARS } from '../../config/env.config';

const clearCookie = (res: Response) => {
  const { NODE_ENV } = ENV_VARS;
  res.clearCookie('secure_token', {
    httpOnly: true,
    sameSite: 'strict',
    secure: NODE_ENV === 'production',
  });
};
export default clearCookie;
