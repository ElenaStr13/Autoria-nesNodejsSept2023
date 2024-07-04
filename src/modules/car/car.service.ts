import {
  BadRequestException,
  HttpException,
  HttpStatus,
  Injectable,
  UnprocessableEntityException,
} from '@nestjs/common';

import { CarEntity } from '../../database/entities/car.entity';
import { CurrencyService } from '../currency/currency.service';
//import { S3Service } from '../s3/s3.service';
import { UserRepository } from '../user/user.repository';
import { CarRepository } from './car.repository';
import { CarCreateReqDto } from './dto/request/car-req-create.dto';
import { CarReqUpdateDto } from './dto/request/car-req-update.dto';
import {
  CarDetailsCreateResDto,
  CarDetailsResDto,
} from './dto/response/car-details-res.dto';
import { EIsActive } from './enum/isActive.enum';
import { EUkraineRegion } from './enum/region.enum';

@Injectable()
export class CarService {
  constructor(
    private readonly carRepository: CarRepository,
    private readonly userRepository: UserRepository,
    private readonly currencyService: CurrencyService,
  ) {}

  async getAllCars(): Promise<CarDetailsResDto[]> {
    return await this.carRepository.find();
  }

  public async getCarById(carId: string): Promise<CarEntity> {
    await this.incViewCountById(carId);
    return await this.incViewCountById(carId);
  }
  public async getCarByIdAllInfo(
    carId: string,
  ): Promise<CarDetailsCreateResDto> {
    await this.incViewCountById(carId);
    const car = await this.incViewCountById(carId);
    const averagePrice = await this.calculateAveragePrice(car.brand);
    const averagePriceByRegion = await this.calculateAveragePriceByRegion(
      car.region,
      car.brand,
    );
    const calculation = await this.currencyService.priceAccordingToTheCourse(
      car.price,
      car.currency,
    );
    car['averagePriceByRegion'] = `${averagePriceByRegion} ${car.currency}`;
    car['averagePrice'] = `${averagePrice} ${car.currency}`;
    car['priceAccordingToTheCourse'] = calculation;
    return car;
  }

  async createCar(
    dto: CarCreateReqDto,
    userId: string,
  ): Promise<CarDetailsResDto> {
    const user = await this.userRepository.findOneBy({
      id: userId,
    });
    if (!user) {
      throw new BadRequestException('User not exist');
    }
    switch (dto.isActive) {
      case EIsActive.EXPECTATION:
        dto.isActive = EIsActive.ACTIVE;
        break;
      case EIsActive.NOT_ACTIVE:
        dto.isActive = EIsActive.NOT_ACTIVE;
        break;
    }
    return await this.carRepository.save(
      this.carRepository.create({ ...dto, user }),
    );
  }

  public async updateCar(
    carId: string,
    dto: CarReqUpdateDto,
  ): Promise<CarEntity> {
    const entity = await this.findCarByIdOrException(carId);
    this.carRepository.merge(entity, dto);
    return await this.carRepository.save(entity);
  }
  public async deleteCar(carId: string): Promise<void> {
    const entity = await this.findCarByIdOrException(carId);
    await this.carRepository.remove(entity);
    throw new HttpException('Car delete!', HttpStatus.OK);
  }

  private async findCarByIdOrException(carId: string): Promise<CarEntity> {
    const car = await this.carRepository.findOneBy({ id: carId });
    if (!car) {
      throw new UnprocessableEntityException('Car entity not found');
    }
    return car;
  }

  private async incViewCountById(carId: string): Promise<CarEntity> {
    const car = await this.findCarByIdOrException(carId);
    car.viewCount = await this.updateAdViews(car.viewCount);
    return await this.carRepository.save(car);
  }
  private async getCarsByRegion(
    region: EUkraineRegion,
    brand: string,
  ): Promise<CarEntity[]> {
    return await this.carRepository.find({ where: { region, brand } });
  }

  private async calculateAveragePriceByRegion(
    region: EUkraineRegion,
    brand: string,
  ): Promise<number> {
    const cars = await this.getCarsByRegion(region, brand);
    return cars.reduce((sum, car) => sum + car.price, 0);
  }
  private async calculateAveragePrice(brand: string): Promise<number> {
    const cars = await this.carRepository.findBy({ brand });
    return cars.reduce((sum, car) => sum + car.price, 0);
  }

  private async updateAdViews(views: any): Promise<string> {
    let adViews = {
      total: 0,
      daily: 0,
      weekly: 0,
      monthly: 0,
      lastViewDate: null,
    };
    if (views !== '0') {
      adViews = JSON.parse(views);
    }

    async function isNewPeriod(lastDate, currentDate, period) {
      if (!(lastDate instanceof Date)) {
        return 1;
      }

      const periodStart = new Date(
        period === 'Date' ? lastDate.getFullYear() : lastDate.getFullYear(),
        period === 'Date'
          ? lastDate.getMonth()
          : lastDate.getDate() - lastDate.getDay(),
      );

      const isSamePeriod = periodStart.getTime() === currentDate.getTime();
      return isSamePeriod ? 0 : 1;
    }

    const currentDate = new Date();
    adViews.total++;
    adViews.daily += await isNewPeriod(
      adViews.lastViewDate,
      currentDate,
      'Date',
    );
    adViews.weekly += await isNewPeriod(
      adViews.lastViewDate,
      currentDate,
      'Week',
    );
    adViews.monthly += await isNewPeriod(
      adViews.lastViewDate,
      currentDate,
      'Month',
    );
    adViews.lastViewDate = currentDate;
    return JSON.stringify(adViews);
  }
}