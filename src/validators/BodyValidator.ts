import {HttpException} from "../exceptions/HttpException";

export function validateCurrency(body) {
    const currencyEntries = [['name', 'string'], ['shortName', 'string'], ['country', 'string'], ['cnbMid', 'number'], ['createdDate', 'string']];
    for (const entry of currencyEntries) {
        if(!body[entry[0]]) {
            throw new HttpException(400, `Property ${entry[0]} is missing!`)
        }
        if(typeof body[entry[0]] !== entry[1]) {
            throw new HttpException(400, `Property ${entry[0]} has incorrect type!`)
        }
    }
}
