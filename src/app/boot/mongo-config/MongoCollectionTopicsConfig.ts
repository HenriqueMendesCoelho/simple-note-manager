import { mongoClient as client } from '../../mongoClient/MongoClient.js';

async function createUniqueIndex() {
  try {
    await client.connect();
    const db = client.db('simple-note-manager');
    const collection = db.collection('topics');

    await collection.createIndex({ title: 1 }, { unique: true });
  } catch (error) {
    console.error('Error creating topics unique index: ', error);
  }
}

export { createUniqueIndex as createUniqueIndexTopicsCollection };
