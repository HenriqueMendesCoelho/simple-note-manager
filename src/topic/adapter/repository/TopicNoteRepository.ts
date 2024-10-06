import { MongoClient, ObjectId } from 'mongodb';
import { TopicNote } from '../../domain/TopicNote.js';
import { GenericRepository } from '../../../app/core/adapter/repository/GenericRepository.js';

export class TopicNoteRepository extends GenericRepository<TopicNote> {
  constructor(protected client: MongoClient) {
    super(client, 'simple-note-manager', 'topics-notes');
  }

  async findAllByTopicId(topicId: ObjectId): Promise<TopicNote[]> {
    try {
      await this.client.connect();
      const result = await this.collection.find({ topicId: topicId }).sort({ title: 1, createdAt: -1 }).toArray();

      return result;
    } catch (error) {
      console.error('Error finding topic note: ', error);
      throw error;
    }
  }
}
