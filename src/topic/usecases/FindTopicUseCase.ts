import { ObjectId } from 'mongodb';
import { TopicRepository } from '../adapter/repository/TopicRepository.js';
import { Topic } from '../domain/Topic.js';

export class FindTopicUseCase {
  constructor(private repository: TopicRepository) {}

  async findAll(): Promise<Topic[]> {
    return await this.repository.findAll();
  }

  async findById(id: string): Promise<Topic> {
    const topic = await this.repository.findByIdIncludeNotes(new ObjectId(id));
    if (!topic) {
      throw new Error('Topic not found');
    }

    return topic;
  }
}
