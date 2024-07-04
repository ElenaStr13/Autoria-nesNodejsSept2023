import {
  CanActivate,
  ExecutionContext,
  HttpException,
  HttpStatus,
  Injectable,
} from '@nestjs/common';

import { brandsAndModels } from '../../../common/constants/brands-and-models';
import { CarBrandRepository } from '../../brand/carBrand.repository';
import { CarModelRepository } from '../../brand/carModel.repository';

@Injectable()
export class CarValidationGuard implements CanActivate {
  constructor(
    private readonly modelRepository: CarModelRepository,
    private readonly brandRepository: CarBrandRepository,
  ) {}
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const { brand, model } = request.body;

    const selectedCarBrand = await this.brandRepository.findOneBy({
      name: brand,
    });

    if (!selectedCarBrand) {
      throw new HttpException(
        'Invalid car brand. Only : Audi, BMW, Mercedes-Benz, Toyota, Honda, Ford  ',
        HttpStatus.BAD_REQUEST,
      );
    }

    const car = brandsAndModels.find((i) => i.brandName === brand);
    const selectedCarModel = await this.modelRepository.findOneBy({
      name: model,
      brand: selectedCarBrand,
    });

    if (!selectedCarModel) {
      throw new HttpException(
        `Invalid car model for the selected brand. Only : ${car.models} `,
        HttpStatus.BAD_REQUEST,
      );
    }

    return true;
  }
}