import { MongoServerError, ObjectId } from 'mongodb';
import { TopicNoteRepository } from '../adapter/repository/TopicNoteRepository.js';
import { TopicNote } from '../domain/TopicNote.js';
import { DuplicateTopicNoteError } from '../errors/DuplicateTopicNoteError.js';
import { TopicRepository } from '../adapter/repository/TopicRepository.js';
import { TopicNotFoundError } from '../errors/TopicNotFoundError.js';

export class CreateTopicNoteUseCase {
  constructor(private repository: TopicNoteRepository, private topicRepository: TopicRepository) {}

  async execute(topicId: string, topic: TopicNote): Promise<TopicNote | null> {
    try {
      await this.topicExists(topicId);

      topic.topicId = new ObjectId(topicId);
      topic.createdAt = new Date();
      const res = await this.repository.create(topic);

      return await this.repository.findById(res.insertedId);
    } catch (error) {
      if (error instanceof MongoServerError && error.message.includes('E11000')) {
        throw new DuplicateTopicNoteError();
      }
      throw error;
    }
  }

  private async topicExists(topicId: string) {
    const topicExists = await this.topicRepository.findById(new ObjectId(topicId));
    if (!topicExists) {
      throw new TopicNotFoundError();
    }
  }
}
