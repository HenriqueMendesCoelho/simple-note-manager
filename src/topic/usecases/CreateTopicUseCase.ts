import { MongoServerError } from 'mongodb';
import { TopicRepository } from '../adapter/repository/TopicRepository.js';
import { Topic } from '../domain/Topic.js';
import { DuplicateTopicError } from '../errors/DuplicateTopicError.js';

export class CreateTopicUseCase {
  constructor(private repository: TopicRepository) {}

  async execute(topic: Topic): Promise<Topic | null> {
    try {
      topic.createdAt = new Date();
      const res = await this.repository.create(topic);

      return await this.repository.findById(res.insertedId);
    } catch (error) {
      if (error instanceof MongoServerError && error.message.includes('E11000')) {
        throw new DuplicateTopicError();
      }
      throw error;
    }
  }
}
