import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RedisModule } from '@webeleon/nestjs-redis';

import { JwtConfigModule } from '../../config/jwt/config.module';
import { JwtConfigService } from '../../config/jwt/configuration.service';
import { UserEntity } from "../../database/entities/user.entity";
import { UserRepository } from '../user/user.repository';
import { UserService } from '../user/user.service';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { BearerStrategy } from './bearer.strategy';

const JwtFactory = (config: JwtConfigService) => ({
  secret: config.secretKey,
  signOptions: {
    expiresIn: config.expiresIn,
  },
});

const JwtRegistrationOptions = {
  imports: [JwtConfigModule],
  useFactory: JwtFactory,
  inject: [JwtConfigService],
};
@Module({
  imports: [
    PassportModule.register({
      defaultStrategy: 'bearer',
      property: 'user',
    }),
    RedisModule.forRoot({
      url: 'redis://localhost:6379',
    }),
    TypeOrmModule.forFeature([UserEntity]),
    JwtModule.registerAsync(JwtRegistrationOptions),
  ],
  providers: [AuthService, BearerStrategy, UserRepository, UserService],
  controllers: [AuthController],
  exports: [PassportModule, AuthService],
})
export class AuthModule {}
