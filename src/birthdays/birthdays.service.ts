import { Injectable } from '@nestjs/common';
import * as moment from 'moment';

interface Rindegastino {
  name: string;
  birthdate: string;
}

@Injectable()
export class BirthdaysService {
  private rindegastinos: Rindegastino[] = [];

  addBirthday(name: string, birthdate: string) {
    this.rindegastinos.push({ name, birthdate });
    return { message: 'Rindegastino agregado exitosamente' };
  }

  getDaysUntilMyBirthday(birthdate: string) {
    const today = moment();
    const nextBirthday = moment(birthdate).year(today.year());

    if (nextBirthday.isBefore(today)) {
      nextBirthday.add(1, 'year');
    }

    const daysUntilBirthday = nextBirthday.diff(today, 'days');
    return { daysUntilBirthday };
  }

  getRindegastinosBirthdays() {
    const today = moment();
    return this.rindegastinos.map(rindegastino => {
      const nextBirthday = moment(rindegastino.birthdate).year(today.year());

      if (nextBirthday.isBefore(today)) {
        nextBirthday.add(1, 'year');
      }

      const daysUntilBirthday = nextBirthday.diff(today, 'days');
      return {
        name: rindegastino.name,
        birthdate: rindegastino.birthdate,
        daysUntilBirthday,
      };
    });
  }
}