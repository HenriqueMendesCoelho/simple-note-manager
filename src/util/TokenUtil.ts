import jwt from 'jsonwebtoken';
import { environment } from '../app.js';

export type PayloadToken = {
  exp: number;
  issuer: string;
  audience: string;
  username: string;
  iat: number;
  roles: string[];
};

const secret = () => environment.JWT_SECRET;
const tokenMaxAgeHours = () => environment.TOKEN_MAX_AGE_HOURS;

export const getPayloadAndVerify = (token: string): PayloadToken => {
  try {
    const options = {
      issuer: 'Simple Note Manager api',
      audience: 'Simple Note Manager user',
      maxAge: tokenMaxAgeHours(),
    };

    token = token.slice(7);
    const payload = jwt.verify(token, secret(), options) as PayloadToken;

    return payload;
  } catch (error) {
    throw error;
  }
};

export const getPayload = (token: string): PayloadToken => {
  try {
    token = token.slice(7);
    const payload = jwt.decode(token) as PayloadToken;

    return payload;
  } catch (error) {
    throw error;
  }
};
