import jwt from 'jsonwebtoken';

const secret = process.env.JWT_SECRET;

export type PayloadToken = {
  exp: number;
  issuer: string;
  audience: string;
  username: string;
  iat: number;
  roles: string[];
};

export const getPayloadAndVerify = (token: string): PayloadToken => {
  try {
    if (!secret) {
      throw new Error('Please define the JWT_SECRET environment variable');
    }
    const options = {
      issuer: 'Simple Note Manager api',
      audience: 'Simple Note Manager user',
      maxAge: '2h',
    };

    token = token.slice(7);
    const payload = jwt.verify(token, secret, options) as PayloadToken;

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
