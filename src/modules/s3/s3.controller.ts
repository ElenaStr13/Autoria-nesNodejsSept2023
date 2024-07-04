
import {
  Controller,
  HttpCode,
  HttpStatus,
  Param,
  Post,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';

import { photoConfig } from '../../common/constants/photo-config';
import { RoleDecorator } from '../../common/decorators/role.decorator';
import { ERole } from '../../common/enum/role.enum';
import { RoleGuard } from '../../common/guards/role.guard';
import { imageFileFilter } from '../../common/utils/file.upload.utils';
import { S3Service } from './s3.service';

@ApiTags('file')
@ApiBearerAuth()
@UseGuards(AuthGuard(), RoleGuard)
@RoleDecorator(ERole.SELLER, ERole.ADMIN)
@Controller('file')
export class S3Controller {
  constructor(private readonly s3Service: S3Service) {}
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({ summary: 'Upload photo car' })
  @Post('car/:carId')
  @UseInterceptors(
    FileInterceptor('photo', {
      fileFilter: imageFileFilter,
      limits: {
        fileSize: photoConfig.MAX_SIZE,
      },
    }),
  )
  async uploadPhotoCar(
    @UploadedFile() file: Express.Multer.File,
    @Param('carId') carId: string,
  ) {
    await this.s3Service.writerCarPhoto(file, carId);
  }
}
