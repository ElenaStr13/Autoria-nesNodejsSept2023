import { Injectable } from '@nestjs/common';
import axios from 'axios';

import { currencyUrl } from '../../common/constants/privat-bank-currency.url';

@Injectable()
export class CurrencyService {
  constructor() {}

  async priceAccordingToTheCourse(
    price: number,
    currency: string,
  ): Promise<string> {
    const exchangeRate = await this.getCurrencyList();
    const newExchangeRate = JSON.parse(JSON.stringify(exchangeRate));
    const foundRate = await newExchangeRate.find(
      (obj) => obj.currency === currency,
    );
    if (currency === 'UAH') {
      return;
    }
    const correctionSaleRate = Math.floor(foundRate.saleRateNB);
    const calculation = price * correctionSaleRate;
    return `${calculation} UAH . Exchange rate = ${correctionSaleRate} `;
  }

  private async getCurrencyList(): Promise<object> {
    try {
      const response = await axios.get(currencyUrl);
      return response.data.exchangeRate;
    } catch (e) {
      throw e;
    }
  }
}