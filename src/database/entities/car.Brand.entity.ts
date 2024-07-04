import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

import { CarModel } from './car.Models.entity';

@Entity()
export class CarBrand {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @OneToMany(() => CarModel, (carModel) => carModel.brand)
  models: CarModel[];
}