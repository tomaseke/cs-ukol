import {Currency} from "../models/Currency";

const mockExchangeRates = [
    {
        "name": "US Dollar",
        "shortName": "USD",
        "country": "US",
        "cnbMid": 21,
        "createdDate": "2022-08-11T11:55:32.397+00:00"
    },
    {
        "name": "US Dollar",
        "shortName": "USD",
        "country": "US",
        "cnbMid": 22,
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
        "cnbMid": 6,
        "createdDate": "2022-08-16T11:55:32.397+00:00"
    }
]

export class MostVolatileCurrenciesService{

    constructor() {}

    // @ts-ignore
    getMostVolatileCurrencies(fromDate: Date, numberOfTheMostVolatileCurrs: number): Currency[] {
        const currenciesAndTheirDelta = new Map();
        for (const currenciesAndTheirDeltaElement of currenciesAndTheirDelta) {
            
        }
    }
}
