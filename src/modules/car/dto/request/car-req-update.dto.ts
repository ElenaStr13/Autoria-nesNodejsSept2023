import { IsEnum, IsNumber, MaxLength, MinLength } from 'class-validator';

import { Transform } from 'class-transformer';
import { ECurrency } from '../../enum/currency.enum';
import { EUkraineRegion } from '../../enum/region.enum';

export class CarReqUpdateDto {
  @IsNumber()
  price: number;

  @IsEnum(ECurrency)
  currency: ECurrency;

  @Transform(({ value }) => value.trim())
  @IsEnum(EUkraineRegion)
  @MinLength(4)
  @MaxLength(30)
  region: EUkraineRegion;
}