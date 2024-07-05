import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { PassportStrategy } from '@nestjs/passport';
import { InjectRedisClient, RedisClient } from '@webeleon/nestjs-redis';
import { Strategy } from 'passport-http-bearer';

import { UserEntity } from "../../database/entities/user.entity";
import { AuthService } from './auth.service';

@Injectable()
export class BearerStrategy extends PassportStrategy(Strategy, 'bearer') {
  constructor(
    private readonly jwtService: JwtService,
    private readonly authService: AuthService,
    @InjectRedisClient() readonly redisClient: RedisClient,
  ) {
    super();
  }

  async validate(token: string): Promise<UserEntity> {
    let user = null;
    try {
      if (!(await this.redisClient.exists(token))) {
        throw new UnauthorizedException();
      }
      await this.jwtService.verifyAsync(token);
      const decodeToken = await this.authService.decode(token);
      user = await this.authService.findUserOrException(decodeToken);
    } catch (err) {
      throw new UnauthorizedException();
    }
    return user;
  }
}
