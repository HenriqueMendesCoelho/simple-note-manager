import UserRepository from '../../../user/adapter/repository/UserRepository.js';
import { Login, Token } from '../../domain/Login.js';
import jwt from 'jsonwebtoken';
import { InvalidCredencialsError } from '../../errors/InvalidCredencialsError.js';
import EncryptUtil from '../../../util/EncryptUtil.js';
import { User } from '../../../user/domain/User.js';
import dayjs from 'dayjs';

export default class LoginUseCase {
  constructor(private userRepository: UserRepository) {}
  private readonly secret = process.env.JWT_SECRET;
  private readonly tokenMaxAgeHours = process.env.TOKEN_MAX_AGE_HOURS;
  private readonly issuer = 'Simple Note Manager api';
  private readonly audience = 'Simple Note Manager user';

  async execute(login: Login): Promise<Token> {
    const user = await this.userRepository.findByUsername(login.username);
    if (!user) {
      throw new InvalidCredencialsError();
    }
    if (!EncryptUtil.validPassword(login.password, user.password!)) {
      throw new InvalidCredencialsError();
    }
    const exp = new Date();
    exp.setHours(exp.getHours() + parseInt(this.tokenMaxAgeHours!));
    const token = this.generateToken(user, exp);

    return {
      acesssToken: token,
      expires: dayjs(exp).format(),
    };
  }

  private generateToken(user: User, exp: Date): string {
    const expInSeconds = Math.floor(exp.getTime() / 1000);
    return jwt.sign(
      {
        id: user._id,
        exp: expInSeconds,
        iss: this.issuer,
        aud: this.audience,
        username: user.username,
        roles: user.roles,
      },
      this.secret!
    );
  }
}
