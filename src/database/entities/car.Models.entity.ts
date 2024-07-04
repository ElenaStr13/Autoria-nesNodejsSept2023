import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

import { CarBrand } from './car.Brand.entity';

@Entity()
export class CarModel {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @ManyToOne(() => CarBrand, (carBrand) => carBrand.models)
  brand: CarBrand;
}