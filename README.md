<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="120" alt="Nest Logo" /></a>
</p>

# Rindegastos

## Descripción

Este proyecto utiliza el framework [Nest](https://github.com/nestjs/nest) para construir una aplicación eficiente y escalable del lado del servidor.

El archivo .env contiene las claves API necesarias para el funcionamiento de la aplicación. Este archivo no se ha agregado al .gitignore para asegurar que las claves API no se pierdan.

## Configuración del Proyecto

### Instalación

```bash
$ npm install

# desarrollo
$ npm run start

# modo watch
$ npm run start:dev

# modo producción
$ npm run start:prod

Endpoints
Exchange
GET /exchange/getConvertedAmount: Convierte una cantidad de una moneda a otra.

Parámetros: from, to, amount
Ejemplo: /exchange/getConvertedAmount?from=USD&to=CLP&amount=500
GET /exchange/getConvertedAmountHistorical: Convierte una cantidad de una moneda a otra en una fecha específica.

Parámetros: from, to, amount, date
Ejemplo: /exchange/getConvertedAmountHistorical?from=USD&to=CLP&amount=500&date=2025-01-01
GET /exchange/getCurrencies: Obtiene la lista de monedas disponibles.

Ejemplo: /exchange/getCurrencies
Birthdays
POST /birthdays/add: Agrega un cumpleaños.

Body: { "name": "Nombre", "birthdate": "YYYY-MM-DD" }
Ejemplo: /birthdays/add
GET /birthdays/getDaysUntilMyBirthday: Obtiene los días restantes hasta el próximo cumpleaños.

Parámetros: birthdate
Ejemplo: /birthdays/getDaysUntilMyBirthday?birthdate=1990-01-01
GET /birthdays/all: Obtiene la lista de todos los cumpleañeros.

Ejemplo: /birthdays/all
Numbers
GET /numbers/getTheNumber: Obtiene una resultado concadenando dos números proporcionados.
Parámetros: first, second
Ejemplo: /numbers/getTheNumber?first=192&second=3