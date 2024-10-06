import { MongoClient, Collection, Db, ObjectId, InsertOneResult, UpdateResult, Document, OptionalUnlessRequiredId, WithId, Filter } from 'mongodb';

export class GenericRepository<T extends Document> {
  protected db: Db;
  protected collection: Collection<T>;

  constructor(protected client: MongoClient, dbName: string, collectionName: string) {
    this.db = this.client.db(dbName);
    this.collection = this.db.collection(collectionName);
  }

  async create(item: OptionalUnlessRequiredId<T>): Promise<InsertOneResult<T>> {
    try {
      await this.client.connect();
      const result = await this.collection.insertOne(item);
      return result;
    } catch (error) {
      console.error('Error creating item: ', error);
      throw error;
    }
  }

  async findById(id: ObjectId): Promise<WithId<T> | null> {
    try {
      await this.client.connect();
      const filter: Filter<T> = { _id: id } as Filter<T>;
      const result = await this.collection.findOne(filter);
      return result;
    } catch (error) {
      console.error(`Error finding item with id: ${id}`, error);
      throw error;
    }
  }

  async findAll(): Promise<WithId<T>[]> {
    try {
      await this.client.connect();
      const result = await this.collection.find({}).toArray();
      return result;
    } catch (error) {
      console.error('Error finding items: ', error);
      throw error;
    }
  }

  async update(id: ObjectId, item: Partial<T>): Promise<UpdateResult<T>> {
    try {
      await this.client.connect();
      const filter: Filter<T> = { _id: id } as Filter<T>;
      const result = await this.collection.updateOne(filter, { $set: item });
      return result;
    } catch (error) {
      console.error(`Error updating item with id: ${id}`, error);
      throw error;
    }
  }

  async deleteById(id: ObjectId): Promise<void> {
    try {
      await this.client.connect();
      const filter: Filter<T> = { _id: id } as Filter<T>;
      await this.collection.deleteOne(filter);
    } catch (error) {
      console.error(`Error deleting item with id: ${id}`, error);
      throw error;
    }
  }
}
