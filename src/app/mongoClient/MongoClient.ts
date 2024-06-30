import { MongoClient } from 'mongodb';

const MONGO_URI = process.env.MONGO_URI;
if (!MONGO_URI) {
  throw new Error('Please define the MONGO_URI environment variable');
}

const uri = MONGO_URI;
const mongoClient = new MongoClient(uri);

export { mongoClient };
