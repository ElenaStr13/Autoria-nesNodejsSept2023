
import { UserEntity } from "../../database/entities/user.entity";
import { CarResponseMapper } from '../car/car.response.mapper';
import { UserCreateReqDto } from "./dto/req/base-user.req.dto";
import { UserDetailsResDto, UserListItemResponseDto } from "./dto/res/user-details-res.dto";


export class UserResponseMapper {
  static toDetailsRegisterDto(data: UserCreateReqDto) {
    return {
      email: data.email,
    };
  }
  static toDetailsListDto(data: UserDetailsResDto[]): UserDetailsResDto[] {
    return data.map(this.toDetailsDto);
  }
  static toDetailsDto(data: UserDetailsResDto): UserDetailsResDto {
    return {
      id: data.id,
      userName: data.userName,
      email: data.email,
      createdAt: data.createdAt,
      updatedAt: data.updatedAt,
      typeAccount: data.typeAccount,
      telegram: data.telegram,
      block: data.block,
      role: data.role,
      cars: data.cars ? CarResponseMapper.toDetailsListDto(data.cars) : null,
    };
  }

  static toListItemDto(data: UserEntity): UserListItemResponseDto {
    return {
      id: data.id,
      userName: data.userName,
      email: data.email,
      telegram: data.telegram,
      role: data.role,
      block: data.block,
      typeAccount: data.typeAccount,
    };
  }

  static toListDto(data: UserListItemResponseDto[]): UserListItemResponseDto[] {
    return data.map(this.toListItemDto);
  }
}