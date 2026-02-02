import { ENV_VARS } from '../../config/env.config';
import jwt, { type JwtPayload } from 'jsonwebtoken';

const verifyToken = (token: string) => {
  const { JWT_SECRET } = ENV_VARS;

  if (!token || !JWT_SECRET) {
    return { decoded: null };
  }

  const decoded = jwt.verify(token, JWT_SECRET) as JwtPayload;

  if (!decoded) {
    return { decoded: null };
  }
  return { decoded };
};

export default verifyToken;
