import { ERole } from '../../../../common/enum/role.enum';
import { CarDetailsResDto } from '../../../car/dto/response/car-details-res.dto';
import { ETypeAccount } from '../../enum/type-account.enum';

export class UserDetailsResDto {
  id: string;
  userName: string;
  email: string;
  telegram: string;
  role: ERole;
  typeAccount: ETypeAccount;
  cars?: CarDetailsResDto[];
  createdAt: Date;
  updatedAt: Date;
  block: boolean;
}

export class UserListItemResponseDto {
  id: string;
  userName: string;
  email: string;
  telegram: string;
  role: ERole;
  typeAccount: ETypeAccount;
  block: boolean;
}
