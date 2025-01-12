import { mongoClient as client } from '../../mongoClient/index.js';

async function createUniqueIndex() {
  try {
    await client.connect();
    const db = client.db('simple-note-manager');
    const collection = db.collection('topics');

    await collection.createIndex({ title: 1 }, { unique: true });
    await collection.createIndex({ 'upVote.userId': 1 }, { unique: true, partialFilterExpression: { 'upVote.userId': { $type: 7 } } });
    await collection.createIndex({ 'downVote.userId': 1 }, { unique: true, partialFilterExpression: { 'downVote.userId': { $type: 7 } } });
  } catch (error) {
    console.error('Error creating topics unique index: ', error);
  }
}

export { createUniqueIndex as createUniqueIndexTopicsCollection };
