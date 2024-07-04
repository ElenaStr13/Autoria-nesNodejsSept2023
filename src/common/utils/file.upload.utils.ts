import { BadRequestException } from '@nestjs/common';

export const editFileName = (req, file, callback) => {
  const uniqueSuffix = Date.now() + '-' + Math.round(Math.random());
  const fileExtension = file.originalname.split('.').pop();
  const randomName = uniqueSuffix;
  callback(null, `${randomName}.${fileExtension}`);
};

export const imageFileFilter = (req, file, callback) => {
  if (!file.originalname.match(/\.(jpg|jpeg|png)$/)) {
    return callback(new BadRequestException('Invalid file format'), false);
  }
  callback(null, true);
};