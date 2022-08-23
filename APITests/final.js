const expect = require('chai').expect;
const axios = require('axios').default;
let {describe, it} = require('mocha');

describe('Converting guatemalan currency to Dogecoin through GBP', async () => {
    before(()=> {
        this.sourceCurrency = 'GTQ';
        this.intermediateCurreny = 'GBP';
        this.finalcurrency = 'DOGE';
        this.startAmount = '10000000';
        this.intermediateAmount = '';
        this.headers = {
            'X-CMC_PRO_API_KEY' : '55468196-5c3d-46b1-8dbd-e4363265afdb'
        };
    })

    it('should convert from guatemalan currency to GBP - 10000000', async () => {
        const response = await axios({
            method: 'get',
        url: 'https://pro-api.coinmarketcap.com/v2/tools/price-conversion',
        headers: this.headers,
        params: {
            amount : this.startAmount ,
            symbol : this.sourceCurrency,
            convert: this.intermediateCurreny
        }})
        expect(response.status).to.be.equal(200);
        // console.log(JSON.stringify(response.data.data))
        this.intermediateAmount = response.data.data[0].quote[this.intermediateCurreny].price
    });

    it(`should convert from GBP to DOGE COIN and print final value. `, async () => {
        const response = await axios({
         method: 'get',
        url: 'https://pro-api.coinmarketcap.com/v2/tools/price-conversion',
        headers: this.headers,
        params: {
            amount : this.intermediateAmount ,
            symbol : this.intermediateCurreny,
            convert: this.finalcurrency
        }})
        expect(response.status).to.be.equal(200);

        console.log('GBP value is : ', this.intermediateAmount);
        console.log("Response is", response.data.data[0].quote[this.finalcurrency].price);
    });
});