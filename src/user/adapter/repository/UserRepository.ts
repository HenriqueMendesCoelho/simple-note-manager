import { Collection, Db, InsertOneResult, MongoClient, ObjectId, UpdateResult } from 'mongodb';
import { User } from '../../domain/User.js';

export default class UserRepository {
  private db: Db;
  private collection: Collection<User>;

  constructor(private client: MongoClient) {
    this.db = this.client.db('simple-note-manager');
    this.collection = this.db.collection('users');
  }

  async create(user: User): Promise<InsertOneResult<User>> {
    try {
      await this.client.connect();
      const result = await this.collection.insertOne(user);

      return result;
    } catch (error) {
      console.error('Error creating user: ', error);
      throw error;
    }
  }

  async findById(id: ObjectId): Promise<User | null> {
    try {
      await this.client.connect();
      const result = await this.collection.findOne({
        _id: id,
      });

      return result;
    } catch (error) {
      console.error('Error finding user: ', error);
      throw error;
    }
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

  async findAll(): Promise<User[]> {
    try {
      await this.client.connect();
      const result = await this.collection.find().toArray();

      return result;
    } catch (error) {
      console.error('Error finding user: ', error);
      throw error;
    }
  }

  async update(_id: ObjectId, user: Partial<User>): Promise<UpdateResult<User>> {
    try {
      await this.client.connect();
      const result = await this.collection.updateOne(
        {
          _id,
        },
        {
          $set: user,
        }
      );

      return result;
    } catch (error) {
      console.error('Error updating user: ', error);
      throw error;
    }
  }

  async deleteById(_id: ObjectId): Promise<void> {
    try {
      await this.client.connect();
      await this.collection.deleteOne({
        _id,
      });
    } catch (error) {
      console.error(`Error deleting user with id: ${_id}`, error);
      throw error;
    }
  }
}
