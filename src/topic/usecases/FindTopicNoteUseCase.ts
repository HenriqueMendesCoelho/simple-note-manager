import { ObjectId } from 'mongodb';
import { TopicNoteRepository } from '../adapter/repository/TopicNoteRepository.js';
import { TopicNote } from '../domain/TopicNote.js';

export class FindTopicNoteUseCase {
  constructor(private repository: TopicNoteRepository) {}

  async findAll(topicId: string): Promise<TopicNote[]> {
    return await this.repository.findAllByTopicId(new ObjectId(topicId));
  }
}
