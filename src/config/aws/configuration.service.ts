import { Inject, Injectable } from '@nestjs/common';
import { ConfigType } from '@nestjs/config';

import configuration from './configuration';

@Injectable()
export class AWSConfigService {
  constructor(
    @Inject(configuration.KEY)
    private awsConfiguration: ConfigType<typeof configuration>,
  ) {}

  get accessKey(): string {
    return String(this.awsConfiguration.accessKey);
  }

  get secretAccessKey(): string {
    return String(this.awsConfiguration.secretAccessKey);
  }

  get bucketName(): string {
    return String(this.awsConfiguration.bucketName);
  }

  get region(): string {
    return String(this.awsConfiguration.region);
  }
}