import { ObjectId } from 'mongodb';
import UserRepository from '../adapter/repository/UserRepository.js';
import { User } from '../domain/User.js';
import { UserNotFoundError } from '../errors/UserNotFoundError.js';

export default class FindUserUseCase {
  constructor(private userRepository: UserRepository) {}

  async findById(_id: string): Promise<User | null> {
    const user = await this.userRepository.findById(new ObjectId(_id));
    delete user?.password;

    if (!user) {
      throw new UserNotFoundError();
    }

    return user;
  }
}
