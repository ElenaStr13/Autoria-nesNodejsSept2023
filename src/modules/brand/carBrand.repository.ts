import { Injectable } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';

import { CarBrand } from "../../database/entities/car.Brand.entity";



@Injectable()
export class CarBrandRepository extends Repository<CarBrand> {
  constructor(private readonly dataSource: DataSource) {
    super(CarBrand, dataSource.manager);
  }
}