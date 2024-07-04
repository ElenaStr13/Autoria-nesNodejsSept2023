import { Module } from '@nestjs/common';
import { ConfigModule } from "@nestjs/config";
import { APP_FILTER } from '@nestjs/core';

import { GlobalExceptionFilter } from "./common/http/global-exception.filter";
import configuration from './config/configs';
import { AuthModule } from './modules/auth/auth.module';
import { CarModule } from "./modules/car/car.module";
import { RedisModule } from "./modules/redis/redis.module";
import { UserModule } from './modules/user/user.module';
import { PostgresModule } from "./postgres/postgres.module";


@Module({
  imports: [
      ConfigModule.forRoot({
      load: [configuration],
      isGlobal: true,
    }),
    RedisModule,
    CarModule,
    PostgresModule,
    AuthModule,
    UserModule
  ],

  controllers: [],
  providers: [
    {
      provide: APP_FILTER,
      useClass: GlobalExceptionFilter,
    },
  ],
})

export class AppModule {}
