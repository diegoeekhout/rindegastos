import { Controller, Post, Body, Get, Query } from '@nestjs/common';
import { BirthdaysService } from './birthdays.service';

@Controller('birthdays')
export class BirthdaysController {
  constructor(private readonly birthdaysService: BirthdaysService) {}

  @Post('add')
  addBirthday(@Body('name') name: string, @Body('birthdate') birthdate: string) {
    return this.birthdaysService.addBirthday(name, birthdate);
  }

  @Get('getDaysUntilMyBirthday')
  getDaysUntilMyBirthday(@Query('birthdate') birthdate: string) {
    return this.birthdaysService.getDaysUntilMyBirthday(birthdate);
  }

  @Get('all')
  getRindegastinosBirthdays() {
    return this.birthdaysService.getRindegastinosBirthdays();
  }
}