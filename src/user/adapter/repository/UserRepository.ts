import { MongoClient } from 'mongodb';
import { User } from '../../domain/User.js';
import { GenericRepository } from '../../../app/core/adapter/repository/GenericRepository.js';

export default class UserRepository extends GenericRepository<User> {
  constructor(protected client: MongoClient) {
    super(client, 'simple-note-manager', 'users');
  }

  async findByUsername(username: string): Promise<User | null> {
    try {
      await this.client.connect();
      const result = await this.collection.findOne({
        username,
      });

      return result;
    } catch (error) {
      console.error('Error finding user by username: ', error);
      throw error;
    }
  }
}
