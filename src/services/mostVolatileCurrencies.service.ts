import {CurrencyModel} from "../models/currency.model";

const mockExchangeRates: CurrencyModel[] = [
    {
        "name": "US Dollar",
        "shortName": "USD",
        "country": "US",
        "cnbMid": 25,
        "createdDate": "2022-08-11T11:55:32.397+00:00"
    },
    {
        "name": "US Dollar",
        "shortName": "USD",
        "country": "US",
        "cnbMid": 26,
        "createdDate": "2022-08-16T11:55:32.397+00:00"
    },
    {
        "name": "British Pound",
        "shortName": "GBP",
        "country": "UK",
        "cnbMid": 28,
        "createdDate": "2022-08-11T11:55:32.397+00:00"
    },
    {
        "name": "British Pound",
        "shortName": "GBP",
        "country": "UK",
        "cnbMid": 30,
        "createdDate": "2022-08-16T11:55:32.397+00:00"
    },
    {
        "name": "Polish Zloty",
        "shortName": "ZLT",
        "country": "Poland",
        "cnbMid": 5,
        "createdDate": "2022-08-11T11:55:32.397+00:00"
    },
    {
        "name": "Polish Zloty",
        "shortName": "ZLT",
        "country": "Poland",
        "cnbMid": 10,
        "createdDate": "2022-08-16T11:55:32.397+00:00"
    }
]

export class MostVolatileCurrenciesService{


    FIVE_DAYS_IN_MS = 4.32e+8;
    constructor() {}

    getMostVolatileCurrencies(inputtedDate: string, numberOfCurrencies: number): string[] {
        const currenciesAndTheirRates = new Map();
        for (const exchangeRate of mockExchangeRates) {
            if(!currenciesAndTheirRates.has(exchangeRate.shortName)) {
                const rateWithInputtedDate = mockExchangeRates.find(rate => rate.createdDate === inputtedDate && rate.shortName === exchangeRate.shortName);
                const exchangeRateBeforeFiveDays = mockExchangeRates.find(rate => (new Date(inputtedDate).getTime() - new Date(rate.createdDate).getTime()) === this.FIVE_DAYS_IN_MS && rate.shortName === exchangeRate.shortName);
                currenciesAndTheirRates.set(exchangeRate.shortName, rateWithInputtedDate.cnbMid - exchangeRateBeforeFiveDays.cnbMid);
            }
        }
        const arrayOfCurrenciesAndRates = Array.from(currenciesAndTheirRates).sort((a, b) => b[1] - a[1]);
        const arrayOfCurrencies = arrayOfCurrenciesAndRates.map(array => array[0]);
        return arrayOfCurrencies.slice(0, numberOfCurrencies);
    }
}
