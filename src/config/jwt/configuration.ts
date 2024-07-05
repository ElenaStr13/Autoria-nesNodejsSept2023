import { registerAs } from '@nestjs/config';
import * as process from 'process';

export default registerAs('jwt', () => ({
  secretKey: process.env.SECRET_KEY,
  expiresIn: process.env.EXPIRES_IN,
}));