import { ObjectId } from 'mongodb';

type vote = {
  userId: ObjectId;
  createdAt: Date;
};

export type TopicNote = {
  _id?: ObjectId;
  topicId?: ObjectId;
  title: string;
  description?: string;
  upVotes?: vote[];
  downVotes?: vote[];
  createdAt?: Date;
  updatedAt?: Date;
};
