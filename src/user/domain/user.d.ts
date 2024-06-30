import { ObjectId } from 'mongodb';

export type User = {
  _id?: ObjectId;
  username: string;
  password?: string;
  roles: string[];
  createdAt: Date;
  updatedAt: Date;
};
