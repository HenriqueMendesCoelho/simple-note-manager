import { ObjectId } from 'mongodb';

export type Topic = {
  _id?: ObjectId;
  title: string;
  description?: string;
  createdAt?: Date;
  updatedAt?: Date;
};
