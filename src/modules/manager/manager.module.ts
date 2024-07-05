import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { UserEntity } from "../../database/entities/user.entity";
import { AuthModule } from '../auth/auth.module';
import { CarModule } from '../car/car.module';
import { CarRepository } from '../car/car.repository';
import { CarService } from '../car/car.service';
import { CurrencyModule } from '../currency/currency.module';
import { UserController } from '../user/user.controller';
import { UserModule } from '../user/user.module';
import { UserRepository } from '../user/user.repository';
import { UserService } from '../user/user.service';
import { ManagerController } from './manager.controller';
import { ManagerService } from './manager.service';

@Module({
  imports: [
    CurrencyModule,
    UserModule,
    CarModule,
    TypeOrmModule.forFeature([UserEntity]),
    AuthModule,
  ],
  controllers: [ManagerController],
  providers: [
    ManagerService,
    UserService,
    UserRepository,
    UserController,
    CarService,
    CarRepository,
  ],
  exports: [],
})
export class ManagerModule {}