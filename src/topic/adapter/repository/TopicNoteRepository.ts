import { Db, Collection, MongoClient, InsertOneResult, ObjectId, UpdateResult } from 'mongodb';
import { TopicNote } from '../../domain/TopicNote.js';

export class TopicNoteRepository {
  private db: Db;
  private collection: Collection<TopicNote>;

  constructor(private client: MongoClient) {
    this.db = this.client.db('simple-note-manager');
    this.collection = this.db.collection('topics-notes');
  }

  async create(topicNote: TopicNote): Promise<InsertOneResult<TopicNote>> {
    try {
      await this.client.connect();
      const result = await this.collection.insertOne(topicNote);

      return result;
    } catch (error) {
      console.error('Error creating topic note: ', error);
      throw error;
    }
  }

  async findById(id: ObjectId): Promise<TopicNote | null> {
    try {
      await this.client.connect();
      const result = await this.collection.findOne({
        _id: id,
      });

      return result;
    } catch (error) {
      console.error(`Error finding topic note with id: ${id}`, error);
      throw error;
    }
  }

  async findAll(topicId: ObjectId): Promise<TopicNote[]> {
    try {
      await this.client.connect();
      const result = await this.collection.find({ topicId: topicId }).sort({ title: 1, createdAt: -1 }).toArray();

      return result;
    } catch (error) {
      console.error('Error finding topic note: ', error);
      throw error;
    }
  }

  async update(_id: ObjectId, topicNote: Partial<TopicNote>): Promise<UpdateResult<TopicNote>> {
    try {
      await this.client.connect();
      const result = await this.collection.updateOne(
        {
          _id,
        },
        {
          $set: topicNote,
        }
      );

      return result;
    } catch (error) {
      console.error('Error updating topic note: ', error);
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
      console.error(`Error deleting topic note with id: ${_id}`, error);
      throw error;
    }
  }
}
