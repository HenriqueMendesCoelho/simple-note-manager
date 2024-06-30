import { mongoClient as client } from '../../mongoClient/MongoClient.js';

async function createUniqueIndex() {
  try {
    await client.connect();
    const db = client.db('simple-note-manager');
    const collection = db.collection('users');

    await collection.createIndex({ username: 1 }, { unique: true });
    console.log('Unique index created successfully');
  } catch (error) {
    console.error('Error creating unique index: ', error);
  }
}

export { createUniqueIndex as createUniqueIndexUserCollection };
