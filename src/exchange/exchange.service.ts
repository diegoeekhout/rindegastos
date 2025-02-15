import { Injectable, BadRequestException } from '@nestjs/common';
import axios from 'axios';

@Injectable()
export class ExchangeService {
  private readonly apiUrl = 'https://openexchangerates.org/api';
  private readonly appId = process.env.OPEN_EXCHANGE_APP_ID;

  async convertCurrency(from: string, to: string, amount: number): Promise<any> {
    try {
      const response = await axios.get(`${this.apiUrl}/latest.json?app_id=${this.appId}`);
      const rates = response.data.rates;

      if (!rates[from] || !rates[to]) {
        throw new BadRequestException('Invalid currency code');
      }

      const fromRate = rates[from];
      const toRate = rates[to];
      const convertedAmount = (amount / fromRate) * toRate;

      return {
        convertedAmount: this.formatNumber(convertedAmount),
        rate: this.formatNumber(toRate / fromRate),
      };
    } catch (error) {
      const errorMessage = (error as Error).message;
      throw new BadRequestException('Error fetching exchange rates: ' + errorMessage);
    }
  }

  async convertCurrencyHistorical(from: string, to: string, amount: number, date: string): Promise<any> {
    try {
      const response = await axios.get(`${this.apiUrl}/historical/${date}.json?app_id=${this.appId}`);
      const rates = response.data.rates;

      if (!rates[from] || !rates[to]) {
        throw new BadRequestException('Invalid currency code');
      }

      const fromRate = rates[from];
      const toRate = rates[to];
      const convertedAmount = (amount / fromRate) * toRate;

      return {
        convertedAmount: this.formatNumber(convertedAmount),
        rate: this.formatNumber(toRate / fromRate),
      };
    } catch (error) {
      const errorMessage = (error as Error).message;
      throw new BadRequestException('Error fetching historical exchange rates: ' + errorMessage);
    }
  }

  async getCurrencies(): Promise<any> {
    try {
      const response = await axios.get(`${this.apiUrl}/currencies.json?app_id=${this.appId}`);
      return response.data;
    } catch (error) {
      const errorMessage = (error as Error).message;
      throw new BadRequestException('Error fetching currencies: ' + errorMessage);
    }
  }

  async getTimeSeries(start: string, end: string, base: string, symbols: string): Promise<any> {
    try {
      const response = await axios.get(`${this.apiUrl}/time-series.json`, {
        params: {
          app_id: this.appId,
          start,
          end,
          base,
          symbols,
        },
      });
      return response.data;
    } catch (error) {
      const errorMessage = (error as Error).message;
      throw new BadRequestException('Error fetching time series data: ' + errorMessage);
    }
  }

  private formatNumber(value: number): string {
    return value.toLocaleString('es-ES', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
  }
}