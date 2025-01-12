import { mongoClient } from './app/mongoClient/index.js';
import { buildFastify } from './server.js';

const app = await buildFastify();
const environment = app.config;

export { app, environment };

// Cleanup Mongo Client
const cleanup = () => {
  mongoClient.close();
  process.exit(0);
};

process.on('SIGINT', cleanup);
process.on('SIGTERM', cleanup);
