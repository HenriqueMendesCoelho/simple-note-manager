import { TopicRepository } from '../adapter/repository/TopicRepository.js';
import { Topic } from '../domain/Topic.js';

export class FindTopicUseCase {
  constructor(private repository: TopicRepository) {}

  async findAll(): Promise<Topic[]> {
    return await this.repository.findAll();
  }
}
