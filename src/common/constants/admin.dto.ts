import { ETypeAccount } from '../../modules/user/enum/type-account.enum';
import { ERole } from '../enum/role.enum';

export const admin = {
  userName: 'admin',
  email: 'admin@gmail.com',
  role: ERole.ADMIN,
  password: 'admin',
  typeAccount: ETypeAccount.PREMIUM,
  telegram: '@admin',
};