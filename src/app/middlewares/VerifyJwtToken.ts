import { FastifyReply, FastifyRequest, HookHandlerDoneFunction } from 'fastify';
import { Role } from '../../user/domain/Role.js';
import { getPayloadAndVerify } from '../../util/TokenUtil.js';

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
    const isValid = getPayloadAndVerify(token);
    return !!isValid;
  } catch {
    return false;
  }
}

function isAdminValid(token: string) {
  try {
    const payload = getPayloadAndVerify(token);

    return !!payload && payload.roles.includes(Role.ADMIN);
  } catch (error) {
    throw error;
  }
}

export { validateJwt, validateJwtAdmin };
