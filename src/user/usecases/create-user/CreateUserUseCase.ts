import { MongoServerError } from 'mongodb';
import EncryptUtil from '../../../util/EncryptUtil.js';
import UserRepository from '../../adapter/repository/UserRepository.js';
import { Role } from '../../domain/Role.js';
import { User } from '../../domain/User.js';
import { DuplicateUsernameError } from '../../errors/DuplicateUsernameError.js';

export default class CreateUserUseCase {
  constructor(private userRepository: UserRepository) {}

  async execute(_user: User, roles = [Role.USER]): Promise<User | null> {
    try {
      _user.createdAt = new Date();
      _user.password = EncryptUtil.hashPassword(_user.password!, EncryptUtil.generateSalt());
      _user.roles = roles;
      const res = await this.userRepository.create(_user);
      const userId = res.insertedId;

      return await this.userRepository.findById(userId);
    } catch (error) {
      if (error instanceof MongoServerError && error.message.includes('E11000')) {
        throw new DuplicateUsernameError();
      }
      throw error;
    }
  }
}
