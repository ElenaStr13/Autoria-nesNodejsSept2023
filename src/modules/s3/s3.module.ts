import { Module } from '@nestjs/common';

import { AWSConfigModule } from '../../config/aws/config.module';
import { AuthModule } from '../auth/auth.module';
import { CarRepository } from '../car/car.repository';
import { S3Controller } from './s3.controller';
import { S3Service } from './s3.service';

@Module({
  imports: [AWSConfigModule, AuthModule],
  providers: [S3Service, CarRepository],
  controllers: [S3Controller],
})
export class S3Module {}