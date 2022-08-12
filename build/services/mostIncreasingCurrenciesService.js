"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MostIncreasingCurrenciesService = void 0;
const constants_1 = require("../constants");
const mockExchangeRates = [
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
];
class MostIncreasingCurrenciesService {
    constructor() {
    }
    getMostIncreasingCurrencies(inputtedDate, numberOfCurrencies) {
        const currenciesAndTheirRates = this.createMapOfCurrenciesAndTheirDifferences(inputtedDate);
        const arrayOfCurrenciesAndRates = Array.from(currenciesAndTheirRates).sort((a, b) => b[1] - a[1]);
        const arrayOfCurrencies = arrayOfCurrenciesAndRates.map(array => array[0]);
        return arrayOfCurrencies.slice(0, numberOfCurrencies);
    }
    createMapOfCurrenciesAndTheirDifferences(inputtedDate) {
        const currenciesAndTheirRates = new Map();
        for (const exchangeRate of mockExchangeRates) {
            if (!currenciesAndTheirRates.has(exchangeRate.shortName)) {
                const rateWithInputtedDate = mockExchangeRates.find(rate => rate.createdDate === inputtedDate && rate.shortName === exchangeRate.shortName);
                const exchangeRateBeforeFiveDays = mockExchangeRates.find(rate => this.checkDateDifference(inputtedDate, rate.createdDate) && rate.shortName === exchangeRate.shortName);
                currenciesAndTheirRates.set(exchangeRate.shortName, rateWithInputtedDate.cnbMid - exchangeRateBeforeFiveDays.cnbMid);
            }
        }
        return currenciesAndTheirRates;
    }
    checkDateDifference(inputtedDate, secondDate) {
        // this will evaluate to true only if it is exactly 5 days
        // if we wanted something like 5.5 day to be considered as 5 days also, the date difference would have to be in range
        return (new Date(inputtedDate).getTime() - new Date(secondDate).getTime()) === constants_1.FIVE_DAYS_IN_MS;
    }
}
exports.MostIncreasingCurrenciesService = MostIncreasingCurrenciesService;
//# sourceMappingURL=mostIncreasingCurrenciesService.js.map