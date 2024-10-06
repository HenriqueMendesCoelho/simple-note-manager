import { MongoClient } from 'mongodb';
import { TopicNote } from '../../domain/TopicNote.js';
import { GenericRepository } from '../../../app/core/adapter/repository/GenericRepository.js';

export class TopicNoteRepository extends GenericRepository<TopicNote> {
  constructor(protected client: MongoClient) {
    super(client, 'simple-note-manager', 'topics-notes');
  }
}
