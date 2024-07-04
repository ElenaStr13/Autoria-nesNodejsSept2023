import { Injectable } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';
import { CarEntity } from '../../database/car.entity';

@Injectable()
export class CarRepository extends Repository<CarEntity> {
  constructor(private readonly dataSource: DataSource) {
    super(CarEntity, dataSource.manager);
  }
}