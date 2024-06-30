import { MongoClient } from 'mongodb';

const MONGO_URI = process.env.MONGO_URI;
if (!MONGO_URI) {
  throw new Error('Please define the MONGO_URI environment variable');
}

const uri = 'mongodb://mongodb:y7EJC38qNd6V@localhost:27017/'; // Replace with your MongoDB URI
const mongoClient = new MongoClient(uri);

export { mongoClient };
