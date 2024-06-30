import fastify from 'fastify';
import { mongoClient } from './app/mongoClient/MongoClient';
import routes from './routes';

const server = fastify();

const PORT = Number(process.env.PORT) || 3000;
server.listen({ port: PORT }, (err, address) => {
  if (err) throw err;
  console.log(`Server listening on: ${address}`);
});
server.register(routes);

export { server };

const cleanup = () => {
  mongoClient.close();
  process.exit(0);
};

process.on('SIGINT', cleanup);
process.on('SIGTERM', cleanup);
