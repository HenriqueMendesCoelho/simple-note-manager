import { ObjectId } from 'mongodb';
import { TopicRepository } from '../adapter/repository/TopicRepository.js';
import { Topic } from '../domain/Topic.js';

export class UpdateTopicUseCase {
  constructor(private repository: TopicRepository) {}

  async execute(id: string, topic: Topic): Promise<Topic | null> {
    topic.updatedAt = new Date();
    const result = await this.repository.update(new ObjectId(id), topic);
    if (result.matchedCount === 0) {
      return null;
    }

    return await this.repository.findById(new ObjectId(id));
  }
}
