import crypto from 'crypto';
import { createUserUseCase, userRepository } from '../../../user/index.js';
import { User } from '../../../user/domain/User.js';
import { Role } from '../../../user/domain/Role.js';

async function validateFirstStart(): Promise<void> {
  const users = await userRepository.findAll();
  if (users.length) {
    return;
  }

  const randomPassword = crypto.randomBytes(30).toString('base64').slice(0, 30);

  const user: User = {
    username: 'simple-note-manager-admin',
    password: randomPassword,
    createdAt: new Date(),
  };

  const userCreated = await createUserUseCase.execute(user, [Role.ADMIN, Role.USER]);
  if (!userCreated) {
    throw new Error('Error creating initial user');
  }

  console.log(
    '\n',
    '**** First start ****',
    '\n',
    'New user have been created',
    '\n',
    `username: ${userCreated.username}`,
    '\n',
    `password: ${randomPassword}`,
    '\n',
    '*********************'
  );
}

export { validateFirstStart };
