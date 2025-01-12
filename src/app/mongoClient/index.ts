import { MongoClient } from 'mongodb';

let mongoClient: MongoClient;

function initializeMongoClient() {
  const uri = process.env.MONGO_URI!;
  mongoClient = new MongoClient(uri);
}

export { mongoClient, initializeMongoClient };
