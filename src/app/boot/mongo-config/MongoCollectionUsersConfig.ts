import { mongoClient as client } from '../../mongoClient/index.js';

async function createUniqueIndex() {
  try {
    await client.connect();
    const db = client.db('simple-note-manager');
    const collection = db.collection('users');

    await collection.createIndex({ username: 1 }, { unique: true });
  } catch (error) {
    console.error('Error creating users unique index: ', error);
  }
}

export { createUniqueIndex as createUniqueIndexUserCollection };
