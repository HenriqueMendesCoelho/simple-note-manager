import { mongoClient as client } from '../../mongoClient/index.js';

async function createUniqueIndex() {
  try {
    await client.connect();
    const db = client.db('simple-note-manager');
    const collection = db.collection('topics-notes');

    await collection.createIndex({ title: 1, topicId: 1 }, { unique: true });
  } catch (error) {
    console.error('Error creating topics notes unique index: ', error);
  }
}

export { createUniqueIndex as createUniqueIndexTopicsNotesCollection };
