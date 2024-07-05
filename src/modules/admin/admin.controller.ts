import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Post,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';

import { RoleDecorator } from '../../common/decorators/role.decorator';
import { ERole } from '../../common/enum/role.enum';
import { RoleGuard } from '../../common/guards/role.guard';
import { AdminService } from './admin.service';
import { AdminCreateReqDto } from './dto/admin-create-req.dto';

@ApiTags('Admin')
@RoleDecorator(ERole.ADMIN)
@ApiBearerAuth()
@UseGuards(AuthGuard(), RoleGuard)
@Controller('admin')
export class AdminController {
  constructor(private readonly adminService: AdminService) {}

  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({
    summary: 'Create manager',
  })
  @Post('manager')
  async createManager(@Body() body: AdminCreateReqDto): Promise<void> {
    await this.adminService.createManager(body);
  }

  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({
    summary:
      'Create admin for partner / All paths are also available to the admin and partner',
  })
  @Post('partner')
  async createPartnerAdmin(@Body() body: AdminCreateReqDto): Promise<void> {
    await this.adminService.createPartnerAdmin(body);
  }
}