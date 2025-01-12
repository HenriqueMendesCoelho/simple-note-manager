import { MongoClient, ObjectId } from 'mongodb';
import { Topic } from '../../domain/Topic.js';
import { GenericRepository } from '../../../app/core/adapter/repository/GenericRepository.js';

export class TopicRepository extends GenericRepository<Topic> {
  constructor(protected client: MongoClient) {
    super(client, 'simple-note-manager', 'topics');
  }

  async findByIdIncludeNotes(topicId: ObjectId): Promise<Topic | null> {
    try {
      await this.client.connect();
      const result = (await this.collection
        .aggregate([
          { $match: { _id: topicId } },
          {
            $lookup: {
              from: 'topics-notes',
              localField: '_id',
              foreignField: 'topicId',
              as: 'notes',
            },
          },
          {
            $limit: 1,
          },
        ])
        .next()) as Topic | null;

      return this.safeObject(result);
    } catch (error) {
      console.error('Error finding topic note: ', error);
      throw error;
    }
  }
}
