import { Module } from '@nestjs/common';

import { CurrencyService } from './currency.service';

@Module({
  imports: [],
  providers: [CurrencyService],
  exports: [CurrencyService],
})
export class CurrencyModule {}