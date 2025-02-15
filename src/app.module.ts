import { Module } from '@nestjs/common';
import { ExchangeModule } from './exchange/exchange.module';
import { BirthdaysModule } from './birthdays/birthdays.module';
import { NumbersModule } from './numbers/numbers.module';
import { AppController } from './app.controller';

@Module({
  imports: [ExchangeModule, BirthdaysModule, NumbersModule],
  controllers: [AppController],
})
export class AppModule {}