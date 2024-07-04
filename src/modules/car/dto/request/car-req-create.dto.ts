import { Transform } from 'class-transformer';
import {
  IsEnum,
  IsNumber,
  IsString,
  Max,
  MaxLength,
  Min,
  MinLength,
} from 'class-validator';

import { ECurrency } from '../../enum/currency.enum';
import { EIsActive } from '../../enum/isActive.enum';
import { EUkraineRegion } from '../../enum/region.enum';

export class CarCreateReqDto {
  @IsNumber()
  @Min(1970)
  @Max(new Date().getFullYear())
  year: number;

  @IsNumber()
  price: number;

  @Transform(({ value }) => value.trim().toLowerCase())
    // @IsEnum(EBrand)
  brand: string;

  @Transform(({ value }) => value.toUpperCase())
  @IsEnum(ECurrency)
  currency: ECurrency;

  @Transform(({ value }) => value.trim().toLowerCase())
  @MinLength(2)
  @MaxLength(20)
    // @IsEnum(EModel)
  model: string;

  @IsString()
  description: string;

  @Transform(({ value }) => value.trim())
  @IsEnum(EUkraineRegion)
  @MinLength(4)
  @MaxLength(30)
  region: EUkraineRegion;

  @IsEnum(EIsActive)
  isActive: EIsActive;
}