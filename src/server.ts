import fastify from 'fastify';
import { mongoClient } from './app/mongoClient/MongoClient.js';
import routes from './routes.js';
import { startup } from './app/boot/index.js';

const server = fastify({ logger: true });

const PORT = Number(process.env.PORT) || 3000;
server.listen({ port: PORT, host: '0.0.0.0' }, (err, address) => {
  if (err) throw err;
  console.log(`Server listening on: ${address}`);
});
server.register(routes);

export { server };

startup();

const cleanup = () => {
  mongoClient.close();
  process.exit(0);
};

process.on('SIGINT', cleanup);
process.on('SIGTERM', cleanup);
