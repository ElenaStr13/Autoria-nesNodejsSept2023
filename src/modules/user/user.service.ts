import {
  BadRequestException,
  HttpException,
  HttpStatus,
  Injectable,
  UnprocessableEntityException,
} from '@nestjs/common';

import { UserEntity } from "../../database/entities/user.entity";
import { UserCreateReqDto } from "./dto/req/base-user.req.dto";
import { UserUpdateReqDto } from "./dto/req/update-user.req.dto";
import { UserDetailsResDto } from "./dto/res/user-details-res.dto";
import { UserRepository } from './user.repository';

@Injectable()
export class UserService {
  constructor(private readonly userRepository: UserRepository) {}

  async getAllUsers(): Promise<UserDetailsResDto[]> {
    return await this.userRepository.find();
  }
  async createUser(dto: UserCreateReqDto): Promise<UserDetailsResDto> {
    const user = await this.userRepository.findOneBy({ email: dto.email });
    if (user) {
      throw new BadRequestException('User already exist');
    }
    return await this.userRepository.save(this.userRepository.create(dto));
  }

  async updateUser(
    userId: string,
    dto: UserUpdateReqDto,
  ): Promise<UserDetailsResDto> {
    const entity = await this.findUserByIdOrException(userId);

    return await this.userRepository.save(
      await this.userRepository.merge(entity, dto),
    );
  }

  public async getUserById(userId: string): Promise<UserEntity> {
    await this.findUserByIdOrException(userId);
    return await this.userRepository.findOne({
      where: { id: userId },
      relations: { cars: true },
    });
  }

  private async findUserByIdOrException(userId: string): Promise<UserEntity> {
    const user = await this.userRepository.findOneBy({ id: userId });
    if (!user) {
      throw new UnprocessableEntityException('User entity not found');
    }
    return user;
  }

  public async deleteUser(userId: string): Promise<void> {
    const entity = await this.findUserByIdOrException(userId);
    await this.userRepository.remove(entity);
    throw new HttpException('User delete!', HttpStatus.OK);
  }
}