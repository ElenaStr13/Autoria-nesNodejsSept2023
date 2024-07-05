import { registerAs } from '@nestjs/config';
import * as process from 'process';

export default registerAs('app', () => ({
  port: process.env.PORT,
  salt: process.env.SALT,
}));