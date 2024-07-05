import fastify from 'fastify';
import { mongoClient } from './app/mongoClient/MongoClient.js';
import routes from './routes.js';
import startup from './app/boot/index.js';
import cors from '@fastify/cors';
import { logger } from './app/middlewares/Logger.js';
import { snakeCaseConverter, camelCaseConverter } from './app/middlewares/CaseConverter.js';

const server = fastify();

const PORT = Number(process.env.PORT) || 5000;
server.listen({ port: PORT, host: '0.0.0.0' }, (err, address) => {
  if (err) throw err;
  console.log(`Server listening on: ${address}`);
});
server.register(cors, {
  origin: '*',
});

server.addHook('onResponse', logger);
server.addHook('preSerialization', snakeCaseConverter);
server.addHook('preHandler', camelCaseConverter);

server.register(routes);

export { server };

// Running files on startup
startup();

// Cleanup Mongo Client
const cleanup = () => {
  mongoClient.close();
  process.exit(0);
};

process.on('SIGINT', cleanup);
process.on('SIGTERM', cleanup);
