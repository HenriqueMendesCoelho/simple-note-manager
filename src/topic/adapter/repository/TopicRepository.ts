import { Db, Collection, MongoClient, InsertOneResult, ObjectId, UpdateResult } from 'mongodb';
import { Topic } from '../../domain/Topic.js';

export class TopicRepository {
  private db: Db;
  private collection: Collection<Topic>;

  constructor(private client: MongoClient) {
    this.db = this.client.db('simple-note-manager');
    this.collection = this.db.collection('topics');
  }

  async create(user: Topic): Promise<InsertOneResult<Topic>> {
    try {
      await this.client.connect();
      const result = await this.collection.insertOne(user);

      return result;
    } catch (error) {
      console.error('Error creating topic: ', error);
      throw error;
    }
  }

  async findById(id: ObjectId): Promise<Topic | null> {
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

  async findAll(): Promise<Topic[]> {
    try {
      await this.client.connect();
      const result = await this.collection.find().sort({ title: 1, createdAt: -1 }).toArray();

      return result;
    } catch (error) {
      console.error('Error finding user: ', error);
      throw error;
    }
  }

  async update(_id: ObjectId, topic: Partial<Topic>): Promise<UpdateResult<Topic>> {
    try {
      await this.client.connect();
      const result = await this.collection.updateOne(
        {
          _id,
        },
        {
          $set: topic,
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
