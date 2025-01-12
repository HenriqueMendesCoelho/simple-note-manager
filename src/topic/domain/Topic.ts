import { ObjectId } from 'mongodb';
import { TopicNote } from './TopicNote.js';

export type Topic = {
  _id?: ObjectId;
  title: string;
  description?: string;
  createdAt?: Date;
  updatedAt?: Date;
  notes?: TopicNote[];
};
