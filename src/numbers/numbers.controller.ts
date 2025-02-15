import { Controller, Get, Query } from '@nestjs/common';
import { NumbersService } from './numbers.service';

@Controller('numbers')
export class NumbersController {
  constructor(private readonly numbersService: NumbersService) {}

  @Get('getTheNumber')
  getTheNumber(@Query('first') first: number, @Query('second') second: number) {
    return this.numbersService.getTheNumber(first, second);
  }
}