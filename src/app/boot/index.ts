import { initializeLoginDependencies } from '../../authentication/index.js';
import { initializeTopicDependencies } from '../../topic/index.js';
import { initializeUserDependencies } from '../../user/index.js';
import { initializeMongoClient } from '../mongoClient/index.js';
import { validateFirstStart } from './first-start/ValidateFirstStart.js';
import { createUniqueIndexTopicsCollection } from './mongo-config/MongoCollectionTopicsConfig.js';
import { createUniqueIndexTopicsNotesCollection } from './mongo-config/MongoCollectionTopicsNoteConfig.js';
import { createUniqueIndexUserCollection } from './mongo-config/MongoCollectionUsersConfig.js';
import fp from 'fastify-plugin';

async function initializeValidations() {
  // Initialize the dependencies
  initializeMongoClient();
  initializeUserDependencies();
  initializeTopicDependencies();
  initializeLoginDependencies();

  // Validate the first start and create the collections
  await validateFirstStart();
  createUniqueIndexUserCollection();
  createUniqueIndexTopicsCollection();
  createUniqueIndexTopicsNotesCollection();

  // Log the environment
  console.log('Environment configured successfully');
}

export default fp(async (fastify) => {
  fastify.addHook('onReady', async () => {
    await initializeValidations();
  });
});
