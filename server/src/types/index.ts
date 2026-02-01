import type { Request } from 'express';
import type mongoose from 'mongoose';

export interface User {
  email: string;
  _id?: mongoose.Types.ObjectId;
  userName?: string;
  image?: string;
  searchHistory: any[]; // TODO: fix it
}

export interface AuthRequest extends Request {
  user?: User;
}
