import { Transform } from 'class-transformer';
import {
  IsEmail,
  IsNotEmpty,
  IsString,
  Matches,
  MaxLength,
  MinLength,
} from 'class-validator';

import { IsAllowedRole } from '../../../../common/decorators/role-validator.dto';
import { ERole } from '../../../../common/enum/role.enum';
import { telegramRegex } from '../../../../common/regex/telegram.regex';

export class UserCreateReqDto {
  @Transform(({ value }) => value.trim().toLowerCase())
  @MinLength(2)
  @MaxLength(20)
  @IsString()
  userName: string;

  @MinLength(3)
  @Transform(({ value }) => value.trim())
  @IsString()
  @Matches(telegramRegex, {
    message: 'Invalid telegram format. Example ( @example ).',
  })
  telegram: string;

  @Transform(({ value }) => value.trim().toLowerCase())
  @IsString()
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @Transform(({ value }) => value.trim().toLowerCase())
  @IsString()
  @IsAllowedRole({ message: 'Invalid role value' })
  role: ERole;

  @Transform(({ value }) => value.trim())
  @IsString()
  @IsNotEmpty()
  password: string;
}