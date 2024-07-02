import { ObjectId } from 'mongodb';
import { TopicRepository } from '../adapter/repository/TopicRepository.js';

export class DeleteTopicUseCase {
  constructor(private repository: TopicRepository) {}

  async execute(_id: string): Promise<void> {
    await this.repository.deleteById(new ObjectId(_id));
  }
}
