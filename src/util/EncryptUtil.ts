import crypto from 'crypto';

export default class EncryptUtil {
  static hashPassword(password: string, salt: string) {
    return `${crypto.pbkdf2Sync(password, salt, 1000, 64, `sha512`).toString(`hex`)}.${salt}`;
  }
  static generateSalt(size = 16): string {
    return crypto.randomBytes(size).toString('hex');
  }
  static validPassword(password: string, hashedPassword: string) {
    const valid = this.hashPassword(password, hashedPassword.split('.')[1]);
    return valid === hashedPassword;
  }
}
