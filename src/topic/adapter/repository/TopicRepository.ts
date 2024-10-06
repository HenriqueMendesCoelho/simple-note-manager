import { MongoClient } from 'mongodb';
import { Topic } from '../../domain/Topic.js';
import { GenericRepository } from '../../../app/core/adapter/repository/GenericRepository.js';

export class TopicRepository extends GenericRepository<Topic> {
  constructor(protected client: MongoClient) {
    super(client, 'simple-note-manager', 'topics');
  }
}
