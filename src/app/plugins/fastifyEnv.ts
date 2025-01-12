import fp from 'fastify-plugin';
import { FromSchema } from 'json-schema-to-ts';
import { type FastifyEnvOptions } from '@fastify/env';
import env from '@fastify/env';

declare module 'fastify' {
  interface FastifyInstance {
    config: FromSchema<typeof schema>;
  }
}

const schema = {
  type: 'object',
  required: ['MONGO_URI', 'JWT_SECRET'],
  properties: {
    PORT: {
      type: 'number',
      default: 5000,
    },
    MONGO_URI: {
      type: 'string',
    },
    JWT_SECRET: {
      type: 'string',
    },
    TOKEN_MAX_AGE_HOURS: {
      type: 'string',
      default: '1h',
    },
  },
} as const;

const options = {
  confKey: 'config',
  schema,
  dotenv: true,
};

export default fp<FastifyEnvOptions>(async (fastify) => {
  await fastify.register(env, options);
});
