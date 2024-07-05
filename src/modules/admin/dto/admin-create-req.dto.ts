import { Transform } from 'class-transformer';
import {
  IsEmail,
  IsEnum,
  IsNotEmpty,
  IsString,
  Matches,
  MaxLength,
  MinLength,
} from 'class-validator';

import { IsAllowedRoleAdmin } from '../../../common/decorators/role-validator.dto';
import { ERole } from '../../../common/enum/role.enum';
import { telegramRegex } from '../../../common/regex/telegram.regex';
import { ETypeAccount } from '../../user/enum/type-account.enum';

export class AdminCreateReqDto {
  @Transform(({ value }) => value.trim().toLowerCase())
  @MinLength(2)
  @MaxLength(20)
  @Transform(({ value }) => value.trim())
  @IsString()
  userName: string;

  @Transform(({ value }) => value.trim().toLowerCase())
  @IsString()
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @MinLength(3)
  @Transform(({ value }) => value.trim())
  @IsString()
  @Matches(telegramRegex, {
    message: 'Invalid format.',
  })
  telegram: string;

  @Transform(({ value }) => value.trim().toLowerCase())
  @IsString()
  @IsAllowedRoleAdmin()
  role: ERole;

  @Transform(({ value }) => value.trim())
  @IsString()
  @IsNotEmpty()
  password: string;

  @IsEnum(ETypeAccount)
  typeAccount: ETypeAccount;
}