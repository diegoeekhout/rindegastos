import { Controller, Get, Query, BadRequestException } from '@nestjs/common';
import { ExchangeService } from './exchange.service';
import { ExchangeDto } from './dto/exchange.dto';

@Controller('exchange')
export class ExchangeController {
  constructor(private readonly exchangeService: ExchangeService) {}

  @Get('getConvertedAmount')
  async getConvertedAmount(@Query() ExchangeDto: ExchangeDto) {
    const { from, to, amount } = ExchangeDto;

    if (!from || !to || !amount) {
      throw new BadRequestException(
        'Faltan parámetros requeridos: from, to, amount',
      );
    }

    if (isNaN(amount) || amount <= 0) {
      throw new BadRequestException('El monto debe ser un número positivo');
    }

    try {
      const result = await this.exchangeService.convertCurrency(
        from,
        to,
        amount,
      );
      return {
        monedaOrigen: from,
        monedaDestino: to,
        montoOriginal: this.formatNumber(amount),
        montoConvertido: result.convertedAmount,
        tasa: result.rate,
      };
    } catch (error) {
      const errorMessage = (error as Error).message;
      throw new BadRequestException(
        'Error al convertir la moneda: ' + errorMessage,
      );
    }
  }

  @Get('getConvertedAmountHistorical')
  async getConvertedAmountHistorical(
    @Query('from') from: string,
    @Query('to') to: string,
    @Query('amount') amount: number,
    @Query('date') date: string,
  ) {
    if (!from || !to || !amount || !date) {
      throw new BadRequestException(
        'Faltan parámetros requeridos: from, to, amount, date',
      );
    }

    if (isNaN(amount) || amount <= 0) {
      throw new BadRequestException('El monto debe ser un número positivo');
    }

    try {
      const result = await this.exchangeService.convertCurrencyHistorical(
        from,
        to,
        amount,
        date,
      );
      return {
        monedaOrigen: from,
        monedaDestino: to,
        montoOriginal: this.formatNumber(amount),
        montoConvertido: result.convertedAmount,
        tasa: result.rate,
        fecha: date,
      };
    } catch (error) {
      const errorMessage = (error as Error).message;
      throw new BadRequestException(
        'Error al convertir la moneda: ' + errorMessage,
      );
    }
  }

  @Get('getCurrencies')
  async getCurrencies() {
    try {
      const result = await this.exchangeService.getCurrencies();
      return result;
    } catch (error) {
      const errorMessage = (error as Error).message;
      throw new BadRequestException(
        'Error al obtener la lista de monedas: ' + errorMessage,
      );
    }
  }

  private formatNumber(value: number): string {
    return value.toLocaleString('es-ES', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    });
  }
}
