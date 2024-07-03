import { FastifyReply, FastifyRequest, HookHandlerDoneFunction } from 'fastify';
import jwt from 'jsonwebtoken';
import { Role } from '../../user/domain/Role.js';

const secret = process.env.JWT_SECRET;
if (!secret) {
  throw new Error('Please define the JWT_SECRET environment variable');
}

type PayloadToken = {
  exp: number;
  issuer: string;
  audience: string;
  username: string;
  iat: number;
  roles: string[];
};

function validateJwt(request: FastifyRequest, reply: FastifyReply, done: HookHandlerDoneFunction) {
  const jwt = request.headers['authorization'];

  if (!jwt) {
    reply.code(401).send();
    return;
  }

  const verify = isValid(jwt);
  if (!verify) {
    reply.status(403).send();
    return;
  }

  done();
}

function validateJwtAdmin(request: FastifyRequest, reply: FastifyReply, done: HookHandlerDoneFunction) {
  const jwt = request.headers['authorization'];

  if (!jwt) {
    reply.code(401).send();
    return;
  }

  const verify = isAdminValid(jwt);
  if (!verify) {
    reply.status(403).send();
    return;
  }

  done();
}

function isValid(token: string) {
  try {
    const isValid = getPayload(token);
    if (!isValid) {
      return false;
    }
    return Date.now() < isValid.exp;
  } catch {
    return false;
  }
}

function isAdminValid(token: string) {
  try {
    const payload = getPayload(token);

    return payload.roles.includes(Role.ADMIN) && Date.now() < payload.exp;
  } catch (error) {
    throw error;
  }
}

function getPayload(token: string): PayloadToken {
  try {
    token = token.slice(7);
    const payload = jwt.verify(token, secret!) as PayloadToken;

    return payload;
  } catch (error) {
    throw error;
  }
}

export { validateJwt, validateJwtAdmin };
