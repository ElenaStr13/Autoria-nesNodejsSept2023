import { registerAs } from '@nestjs/config';
import * as process from 'process';

export default registerAs('aws', () => ({
  accessKey: process.env.S3_ACCESS_KEY,
  secretAccessKey: process.env.S3_SECRET_KEY,
  bucketName: process.env.S3_BUCKET,
  region: process.env.S3_REGION,
}));