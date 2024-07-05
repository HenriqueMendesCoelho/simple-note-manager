import { ObjectId } from 'mongodb';
import { TopicNoteRepository } from '../adapter/repository/TopicNoteRepository.js';
import { TopicNote } from '../domain/TopicNote.js';
import { TopicNoteNotFoundError } from '../errors/TopicNoteNotFoundError.js';

export class UpdateTopicNoteUseCase {
  constructor(private repository: TopicNoteRepository) {}

  async execute(id: string, topicNote: TopicNote): Promise<TopicNote | null> {
    topicNote.updatedAt = new Date();
    const result = await this.repository.update(new ObjectId(id), topicNote);
    if (result.matchedCount === 0) {
      throw new TopicNoteNotFoundError();
    }

    return await this.repository.findById(new ObjectId(id));
  }
}
