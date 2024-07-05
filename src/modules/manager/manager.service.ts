
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';

import { CarRepository } from '../car/car.repository';
import { CarDetailsResDto } from '../car/dto/response/car-details-res.dto';
import { EIsActive } from '../car/enum/isActive.enum';
import { ETypeAccount } from '../user/enum/type-account.enum';
import { UserRepository } from '../user/user.repository';
import { UserService } from '../user/user.service';

@Injectable()
export class ManagerService {
  constructor(
    private readonly userService: UserService,
    private readonly userRepository: UserRepository,
    private readonly carRepository: CarRepository,
  ) {}

  async getNotActiveCars(): Promise<CarDetailsResDto[]> {
    return await this.carRepository.findBy({ isActive: EIsActive.NOT_ACTIVE });
  }

  async givePremium(userId: string): Promise<void> {
    const entity = await this.userService.getUserById(userId);
    // entity.typeAccount = ETypeAccount.PREMIUM;
    const premium = ETypeAccount.PREMIUM;
    await this.userRepository.save(
      await this.userRepository.merge(entity, { typeAccount: premium }),
    );
    throw new HttpException(
      `User ${entity.userName} now PREMIUM`,
      HttpStatus.OK,
    );
  }

  async blockUser(userId: string): Promise<void> {
    const user = await this.userService.getUserById(userId);
    user.block = true;
    await this.userRepository.save(user);
    throw new HttpException('User block', HttpStatus.OK);
  }

  async unblockUser(userId: string): Promise<void> {
    const user = await this.userService.getUserById(userId);
    user.block = false;
    await this.userRepository.save(user);
    throw new HttpException('User unblock!', HttpStatus.OK);
  }

  async deleteUser(userId: string): Promise<void> {
    await this.userService.deleteUser(userId);
  }
}
