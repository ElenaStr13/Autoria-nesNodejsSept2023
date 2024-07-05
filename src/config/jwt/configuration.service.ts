import { Inject, Injectable } from '@nestjs/common';
import { ConfigType } from '@nestjs/config';

import configuration from './configuration';

@Injectable()
export class JwtConfigService {
  constructor(
    @Inject(configuration.KEY)
    private jwtConfiguration: ConfigType<typeof configuration>,
  ) {}

  get secretKey(): string {
    return String(this.jwtConfiguration.secretKey);
  }
  get expiresIn(): string {
    return String(this.jwtConfiguration.expiresIn);
  }
}