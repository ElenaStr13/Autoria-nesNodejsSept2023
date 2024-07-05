import { Injectable } from '@nestjs/common';

import { AuthService } from '../auth/auth.service';
import { AdminCreateReqDto } from './dto/admin-create-req.dto';

@Injectable()
export class AdminService {
  constructor(private readonly authService: AuthService) {}

  async createAdmin(admin: AdminCreateReqDto) {
    await this.authService.register(admin);
  }

  async createManager(dto: AdminCreateReqDto): Promise<void> {
    await this.authService.registerManager(dto);
  }

  async createPartnerAdmin(dto: AdminCreateReqDto): Promise<void> {
    await this.authService.registerPartnerAdmin(dto);
  }
}