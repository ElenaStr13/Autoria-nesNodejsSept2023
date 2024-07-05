import { Body, Controller, Get, Param, Patch, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';

import { RoleDecorator } from '../../common/decorators/role.decorator';
import { ERole } from '../../common/enum/role.enum';
import { BlockGuard } from '../../common/guards/banned.guard';
import { RoleGuard } from '../../common/guards/role.guard';
import { UserUpdateReqDto } from "./dto/req/update-user.req.dto";
import { UserDetailsResDto, UserListItemResponseDto } from "./dto/res/user-details-res.dto";
import { UserResponseMapper } from './user.response.mapper';
import { UserService } from './user.service';

@ApiBearerAuth()
@ApiTags('Users')
@UseGuards(AuthGuard(), RoleGuard, BlockGuard)
@RoleDecorator(ERole.ADMIN)
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @RoleDecorator(ERole.BUYER, ERole.SELLER)
  @ApiOperation({ summary: 'Get list of users' })
  @Get()
  async getAllUsers(): Promise<UserListItemResponseDto[]> {
    const result = await this.userService.getAllUsers();
    return UserResponseMapper.toListDto(result);
  }
  @RoleDecorator(ERole.BUYER, ERole.SELLER)
  @ApiOperation({ summary: 'Update user' })
  @Patch(':userId')
  async updateUser(
    @Param('userId') userId: string,
    @Body() body: UserUpdateReqDto,
  ): Promise<UserDetailsResDto> {
    const result = await this.userService.updateUser(userId, body);
    return UserResponseMapper.toDetailsDto(result);
  }
  @RoleDecorator(ERole.BUYER, ERole.SELLER)
  @ApiOperation({ summary: 'Get user by id' })
  @Get(':userId')
  async getUserById(
    @Param('userId') userId: string,
  ): Promise<UserDetailsResDto> {
    const result = await this.userService.getUserById(userId);
    return UserResponseMapper.toDetailsDto(result);
  }
}
