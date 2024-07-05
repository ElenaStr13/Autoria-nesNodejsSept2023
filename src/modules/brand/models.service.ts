import { Injectable } from '@nestjs/common';

import { CarBrand } from "../../database/entities/car.Brand.entity";
import { CarModel } from "../../database/entities/car.Models.entity";
import { CarBrandRepository } from './carBrand.repository';
import { CarModelRepository } from './carModel.repository';

@Injectable()
export class ModelsService {
  constructor(
    private readonly carBrandRepository: CarBrandRepository,
    private readonly carModelRepository: CarModelRepository,
  ) {}

  async createBrandsAndModels(brandsAndModels): Promise<void> {
    for (const brandAndModels of brandsAndModels) {
      const brand = new CarBrand();
      brand.name = brandAndModels.brandName;

      const models = brandAndModels.models.map((modelName) => {
        const model = new CarModel();
        model.name = modelName;
        model.brand = brand;
        return model;
      });

      await this.carBrandRepository.save(brand);
      await this.carModelRepository.save(models);
    }
  }
}