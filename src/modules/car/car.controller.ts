import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';

import { RoleDecorator } from '../../common/decorators/role.decorator';
import { ERole } from '../../common/enum/role.enum';
import { BlockGuard } from '../../common/guards/banned.guard';
import { RoleGuard } from '../../common/guards/role.guard';
import { StatusAccountValidateGuard } from '../../common/guards/status-account-validate.guard';
import { CarResponseMapper } from './car.response.mapper';
import { CarService } from './car.service';
import { CarCreateReqDto } from './dto/request/car-req-create.dto';
import { CarReqUpdateDto } from './dto/request/car-req-update.dto';
import {
  CarDetailsCreateResDto,
  CarDetailsResDto,
} from './dto/response/car-details-res.dto';
import { BadWordsValidation } from './guard/bad-words-validation.guard';
import { CarValidationGuard } from './guard/brands-and-models.guard';
//import { StatusAccountGuard } from './guard/status-accouny.guard';

@ApiTags('Cars')
@ApiBearerAuth()
@UseGuards(AuthGuard(), RoleGuard, BlockGuard)
@RoleDecorator(ERole.SELLER, ERole.ADMIN)
@Controller('car')
export class CarController {
  constructor(private readonly carService: CarService) {}
  @ApiOperation({ summary: 'Create new car' })
  @UseGuards(BadWordsValidation, StatusAccountValidateGuard, CarValidationGuard)
  @Post(':userId')
  async createCar(
    @Body() body: CarCreateReqDto,
    @Param('userId') userId: string,
  ): Promise<CarDetailsCreateResDto> {
    const result = await this.carService.createCar(body, userId);
    return CarResponseMapper.toDetailsDto(result);
  }

  @RoleDecorator(ERole.BUYER)
  @ApiOperation({
    summary: 'Get list of cars / also available for the BUYER role',
  })
  @Get()
  async getAllCars(): Promise<CarDetailsResDto[]> {
    const result = await this.carService.getAllCars();
    return CarResponseMapper.toDetailsListDto(result);
  }

  @RoleDecorator(ERole.BUYER, ERole.MANAGER)
  @ApiOperation({
    summary: 'Get car by id',
  })
  @Get(':carId')
  async getCarById(@Param('carId') carId: string): Promise<CarDetailsResDto> {
    const result = await this.carService.getCarById(carId);
    return CarResponseMapper.toDetailsDto(result);
  }

  @RoleDecorator(ERole.BUYER, ERole.MANAGER)
  //@UseGuards(StatusAccountGuard)
  @ApiOperation({
    summary: 'Get all the information about the car . Type account PREMIUM',
  })
  @Get('info/:carId')
  async getCarByIdAllInfo(
    @Param('carId') carId: string,
  ): Promise<CarDetailsCreateResDto> {
    const result = await this.carService.getCarByIdAllInfo(carId);
    return CarResponseMapper.toAllDetailsDto(result);
  }

  @ApiOperation({ summary: 'Update car by id' })
  @Put(':carId')
  async updateCar(
    @Param('carId') carId: string,
    @Body() body: CarReqUpdateDto,
  ): Promise<CarDetailsResDto> {
    const result = await this.carService.updateCar(carId, body);
    return CarResponseMapper.toDetailsDto(result);
  }

  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({ summary: 'Delete car by id' })
  @Delete(':carId')
  async deleteCar(@Param('carId') carId: string): Promise<void> {
    await this.carService.deleteCar(carId);
  }
}