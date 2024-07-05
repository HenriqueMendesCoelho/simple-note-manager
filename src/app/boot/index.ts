import { validateFirstStart } from './first-start/ValidateFirstStart.js';
import { createUniqueIndexTopicsCollection } from './mongo-config/MongoCollectionTopicsConfig.js';
import { createUniqueIndexTopicsNotesCollection } from './mongo-config/MongoCollectionTopicsNoteConfig.js';
import { createUniqueIndexUserCollection } from './mongo-config/MongoCollectionUsersConfig.js';

async function startup() {
  await validateFirstStart();
  createUniqueIndexUserCollection();
  createUniqueIndexTopicsCollection();
  createUniqueIndexTopicsNotesCollection();

  console.log('Environment configured successfully');
}

export default startup;
