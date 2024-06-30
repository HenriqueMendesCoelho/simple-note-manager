import EncryptUtil from '../../../util/EncryptUtil';
import UserRepository from '../../adapter/repository/UserRepository';
import { User } from '../../domain/user';

export default class CreateUserUseCase {
  constructor(private userRepository: UserRepository) {}

  async execute(_user: User): Promise<User | null> {
    try {
      _user.createdAt = new Date();
      _user.password = EncryptUtil.hashPassword(_user.password!, EncryptUtil.generateSalt());
      _user.roles = ['user'];
      const res = await this.userRepository.create(_user);
      const userId = res.insertedId;

      return await this.userRepository.findById(userId);
    } catch {
      return null;
    }
  }
}
