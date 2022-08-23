const expect = require('chai').expect;
const axios = require('axios').default;
let {describe, it} = require('mocha');

describe('Converting guatemalan currency to Dogecoin through GBP', () => {
    
    before(()=> {
        this.intermediateAmount = '';
        this.finalAmount = '';
        this.headers = {
            'X-CMC_PRO_API_KEY' : '55468196-5c3d-46b1-8dbd-e4363265afdb'
        };
    })


    it.only('should convert from guatemalan currency to GBP - 10000000', () => {
        axios({
            method: 'get',
        url: "https://pro-api.coinmarketcap.com/v2/tools/price-conversion",
        headers: this.headers,
        params: {
            amount : 10000000,
            symbol : "GTQ",
            convert: "GBP"
        }})
        .then(response => {
            expect(response.status).to.be.equal(200);
            this.intermediateAmount = response.data.data[0].quote.GBP.price;
            console.log('GBP value is : ', this.intermediateAmount);
        })
        .catch(err => console.error(err));
    });

    it(`should convert from GBP to DOGE COIN and print final value. `, () => {
        const response = axios({
         method: 'get',
         url: "https://pro-api.coinmarketcap.com/v2/tools/price-conversion",
        headers: this.headers,
        params: {
            amount : 1000000,
            symbol : "GBP",
            convert: "DOGE"
        }})
        .then(response => {

            expect(response.status).to.be.equal(200);
            console.log("Response is", response.data.data[0].quote.DOGE.price);
        } )
        .catch(err => console.log(err));
        
    });
});

//Need to check if we can pass variables from one test to another...

//JSON
//     data: [
    //       {
    //         id: 2791,
    //         symbol: 'GBP',
    //         name: 'Pound Sterling',
    //         amount: 100000,
    //         last_updated: '2022-08-21T13:01:18.000Z',
    //         quote: [Object]
    //       },
    //       {
    //         id: 6897,
    //         symbol: 'GBP',
    //         name: 'Good Boy Points',
    //         amount: 100000,
    //         quote: [Object]
    //       }
    //     ]