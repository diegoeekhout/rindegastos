import { Injectable } from '@nestjs/common';

@Injectable()
export class NumbersService {
  getTheNumber(first: number, second: number) {
    let result = '';
    for (let i = 1; i <= second; i++) {
      result += (first * i).toString();
      if (result.length >= 9) {
        break;
      }
    }
    return { result: result.slice(0, 9) };
  }
}
