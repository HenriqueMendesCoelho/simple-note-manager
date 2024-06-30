import { validateFirstStart } from './first-start/ValidateFirstStart.js';
import { createUniqueIndexUserCollection } from './mongo-config/MongoCollectionUserConfig.js';

async function startup() {
  await validateFirstStart();
  createUniqueIndexUserCollection();

  console.log('Environment configured successfully');
}

export { startup };
