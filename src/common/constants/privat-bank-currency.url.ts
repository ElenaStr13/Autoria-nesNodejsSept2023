const currentDate = new Date();
const day = currentDate.getDate();
const month = currentDate.getMonth();
const year = currentDate.getFullYear();
const nawDate = `${day}.${month}.${year}`;

export const currencyUrl = `https://api.privatbank.ua/p24api/exchange_rates?date=${nawDate}`;