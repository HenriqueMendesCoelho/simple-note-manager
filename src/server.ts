import fastify from 'fastify';
import { mongoClient } from './app/mongoClient/MongoClient.js';
import routes from './routes.js';
import startup from './app/boot/index.js';

const server = fastify();

const PORT = Number(process.env.PORT) || 3000;
server.listen({ port: PORT, host: '0.0.0.0' }, (err, address) => {
  if (err) throw err;
  console.log(`Server listening on: ${address}`);
});

server.addHook('onResponse', (request, reply, done) => {
  const { method, url } = request.raw;
  const { statusCode } = reply;
  const ip = request.ip;
  console.info(`[${statusCode}][${method}]${url}[from:${ip}]`);

  done();
});

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
