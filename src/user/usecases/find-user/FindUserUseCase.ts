import { ObjectId } from 'mongodb';
import UserRepository from '../../adapter/repository/UserRepository';
import { User } from '../../domain/user';

export default class FindUserUseCase {
  constructor(private userRepository: UserRepository) {}

  async findById(_id: string): Promise<User | null> {
    try {
      const user = await this.userRepository.findById(new ObjectId(_id));
      delete user?.password;

      return user;
    } catch (error) {
      return null;
    }
  }
}
