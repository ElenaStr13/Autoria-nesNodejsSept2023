import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

import { ERole } from "../../common/enum/role.enum";
import { ETypeAccount } from "../../modules/user/enum/type-account.enum";
import { CreatedUpdatedModel } from "../common/created-updated.model";
import { CarEntity } from './car.entity';

@Entity('user')
export class UserEntity extends CreatedUpdatedModel {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'text' })
  userName: string;

  @Column({ type: 'text', unique: true })
  email: string;

  @Column({ type: 'text', unique: true })
  telegram: string;

  @Column({ type: 'enum', enum: ERole })
  role: ERole;

  @Column({ type: 'enum', enum: ETypeAccount, default: ETypeAccount.BASIC })
  typeAccount: ETypeAccount;

  @Column({ type: 'text' })
  password: string;

  @Column({ type: 'boolean', default: false })
  block: boolean;

  @OneToMany(() => CarEntity, (entity) => entity.user)
  cars: CarEntity[];
}