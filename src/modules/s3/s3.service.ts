
import { PutObjectCommand, S3Client, S3ClientConfig } from '@aws-sdk/client-s3';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
//import { ApiOkResponse } from '@nestjs/swagger';
import * as path from 'path';
import { v4 } from 'uuid';

import { AWSConfigService } from '../../config/aws/configuration.service';
import { CarRepository } from '../car/car.repository';

@Injectable()
export class S3Service {
  private readonly client: S3Client;
  constructor(
    private readonly awsConfig: AWSConfigService,
    private readonly carRepository: CarRepository,
  ) {
    const configuration: S3ClientConfig = {
      credentials: {
        accessKeyId: this.awsConfig.accessKey,
        secretAccessKey: this.awsConfig.secretAccessKey,
      },
      region: this.awsConfig.region,
    };

    this.client = new S3Client(configuration);
  }

  private async uploadFile(
    file: Express.Multer.File,
    carId: string,
  ): Promise<string> {
    const filePath = this.buildPath(file.originalname, carId);
    await this.client.send(
      new PutObjectCommand({
        Bucket: this.awsConfig.bucketName,
        Key: filePath,
        Body: file.buffer,
        ContentType: file.mimetype,
        ACL: 'public-read',
        ContentLength: file.size,
      }),
    );
    return filePath;
  }

  async writerCarPhoto(
    file: Express.Multer.File,
    carId: string,
  ): Promise<void> {
    const path = await this.uploadFile(file, carId);
    const urlPhoto = `https://sell-buy-car.s3.amazonaws.com/${path}`;
    const car = await this.carRepository.findOneBy({ id: carId });
    car.photo = urlPhoto;
    await this.carRepository.save(car);
    throw new HttpException('Photo car upload', HttpStatus.OK);
  }

  private buildPath(fileName: string, carId: string): string {
    return `cars/${carId}/${v4()}${path.extname(fileName)}`;
  }
}
