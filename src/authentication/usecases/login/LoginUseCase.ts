import UserRepository from '../../../user/adapter/repository/UserRepository.js';
import { toISOStringWithTimezone } from '../../../util/DateUtil.js';
import { Login, Token } from '../../domain/Login.js';
import jwt from 'jsonwebtoken';
import { InvalidCredencialsError } from '../../errors/InvalidCredencialsError.js';
import EncryptUtil from '../../../util/EncryptUtil.js';
import { User } from '../../../user/domain/User.js';

export default class LoginUseCase {
  constructor(private userRepository: UserRepository) {}
  private readonly secret = process.env.JWT_SECRET;
  private readonly issuer = 'Simple Note Manager api';
  private readonly audience = 'Simple Note Manager user';
  private readonly expHours = 2;

  async execute(login: Login): Promise<Token> {
    const user = await this.userRepository.findByUsername(login.username);
    if (!user) {
      throw new InvalidCredencialsError();
    }
    if (!EncryptUtil.validPassword(login.password, user.password!)) {
      throw new InvalidCredencialsError();
    }
    const exp = new Date();
    exp.setHours(exp.getHours() + this.expHours);
    const token = this.generateToken(user, exp);

    return {
      acesssToken: token,
      expires: toISOStringWithTimezone(exp),
    };
  }

  private generateToken(user: User, exp: Date): string {
    return jwt.sign(
      {
        id: user._id,
        exp: exp.getTime(),
        iss: this.issuer,
        aud: this.audience,
        username: user.username,
        roles: user.roles,
      },
      this.secret!
    );
  }
}
