import { ObjectId } from 'mongodb';
import { TopicNoteRepository } from '../adapter/repository/TopicNoteRepository.js';

export class DeleteTopicNoteUseCase {
  constructor(private repository: TopicNoteRepository) {}

  async execute(_id: string): Promise<void> {
    await this.repository.deleteById(new ObjectId(_id));
  }
}
