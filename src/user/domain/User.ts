import { ObjectId } from 'mongodb';
import { Role } from './Role.js';

export type User = {
  _id?: ObjectId;
  username: string;
  password?: string;
  roles?: Role[];
  createdAt?: Date;
  updatedAt?: Date;
};
