import fastify from 'fastify';
import routes from './routes.js';
import cors from '@fastify/cors';
import { logger } from './app/middlewares/Logger.js';
import { snakeCaseConverter, camelCaseConverter } from './app/middlewares/CaseConverter.js';
import fastifyEnv from './app/plugins/fastifyEnv.js';
import startup from './app/boot/index.js';
import 'dotenv/config';

const buildFastify = async () => {
  const server = fastify();

  await server.register(fastifyEnv);
  await server.register(startup);
  await server.register(routes);
  await server.register(cors, {
    origin: '*',
  });
  server.addHook('onResponse', logger);
  server.addHook('preSerialization', snakeCaseConverter);
  server.addHook('preHandler', camelCaseConverter);

  const PORT = server.config.PORT;
  server.listen({ port: PORT, host: '0.0.0.0' }, (err, address) => {
    if (err) throw err;
    console.log(`Server listening on: ${address}`);
  });

  return server;
};

export { buildFastify };
