import {
  BadRequestException,
  CanActivate,
  ExecutionContext,
  Injectable,
} from '@nestjs/common';

import { ETypeAccount } from '../../modules/user/enum/type-account.enum';
import { UserRepository } from '../../modules/user/user.repository';

@Injectable()
export class StatusAccountValidateGuard implements CanActivate {
  constructor(private readonly userRepository: UserRepository) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const userId = request.params.userId;
    const user = await this.userRepository.findOne({
      where: { id: userId },
      relations: { cars: true },
    });

    switch (user.typeAccount) {
      case ETypeAccount.BASIC:
        if (user.cars.length === 0) {
          return true;
        }
        if (user.cars.length > 0) {
          throw new BadRequestException(
            'You already have one car to create several more, purchase a premium account type',
          );
          return false;
        }
        break;
      case ETypeAccount.PREMIUM:
        return true;
        break;
    }
    return true;
  }
}