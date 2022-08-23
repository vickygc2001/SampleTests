const EC = require('wdio-wait-for');
const { expect } = require('chai');

const path = '/';
const rowIndexes = {
    name: 2,
    price:3,
    oneHourpc: 4,
    twentyhourpc: 5,
    sevendaypc: 6,
    marketCAP: 7,
    volume:8,
    supply: 9
};

const expectedTableData = [];
const actualTableData = [];

const gotitButton = '.gv-footer button';
const signUpButton = '.buttons button:nth-child(1)';
const maybeLaterButton = '.buttons button:nth-child(2)';
const cookieBannerClose = '#cmc-cookie-policy-banner div[class = "cmc-cookie-policy-banner__close"]';
const rowsDropdown = '.table-control-area div > div';
const selectOption = (value)  =>  `//div[(@class ="tippy-content")]//button[text() = ${value} ]`
const table = 'table[class *= "cmc-table"]';
const tableColumns = 'thead th';
const tableRows = 'tbody tr';
const tableDataLoader = '#nprogress';
const filter = 'div> button[class $= "table-control-filter"]';
//const algorithm = 'div.grid li.filter:nth-child(2)'
const algorithm = '//button[text()="Algorithm"]';
const PoWoption = '//ul/li[@class = "optionGroupItem" and text()= "PoW"]';
const PoWBtn = '//button[text()="PoW"]';

const moreFilter = '//li[div[span[button[text()="Industry"]]]]/following-sibling::li[1]//button';
const mineable = 'label#mineable span';
const allcc = 'div[class $="filter-area"] > div:nth-child(1) button[data-qa-id="filter-dd-toggle"]';
const coins = '//button[text()="Coins"]';
const coinsChk = '//button[text()="All Cryptocurrencies"]//h5[text()="Coins Only"]'
const priceButton = 'div[class $="filter-area"] > div:nth-child(3) button';
const pricemin = '[data-qa-id="range-filter-input-min"]';
const pricemax = '[data-qa-id="range-filter-input-max"]';
const applyFilter = '//button[text()="Apply Filter"]';
const showResults = '//button[text()="Show results"]';

const loadURL = () => {
    browser.url(path);
}

const handlePopups = () => {
    $(gotitButton).click();
    browser.pause(2000);
    //Cookie Banner
    browser.waitUntil(EC.presenceOf(cookieBannerClose),{timeout: 10000});
    browser.waitUntil(EC.elementToBeClickable(cookieBannerClose),{timeout: 20000});
    $(cookieBannerClose).click();
    browser.pause(2000);
    //browser.debug();

    //Maybe Later
    browser.waitUntil(EC.presenceOf(maybeLaterButton),{timeout: 30000});
    browser.waitUntil(EC.elementToBeClickable(maybeLaterButton),{timeout: 10000});
    $(maybeLaterButton).click();
    browser.pause(2000);
}

const selectRows = (rows) => {
    $(rowsDropdown).click();
    $(selectOption(rows)).click();
    browser.waitUntil(EC.invisibilityOf(tableDataLoader));

}

const extractTableData = () => {
    const tableElement = $(table);
    const rows = tableElement.$$(tableRows);
    for (const entry of rows) {
        let rowdata = {};
        rowdata['name'] =  ((entry.$$('td')[rowIndexes.name]).getText()).replace('\n', '-');
        rowdata['price'] =  ((entry.$$('td')[rowIndexes.price]).getText()).replace('\n', '-');
        expectedTableData.push(rowdata);
    }

    //console.log(JSON.stringify(tableData));    
}

const applyTableFilters = () => {
    //filter by Algorith - "PoW"
    $(filter).click();
    browser.waitUntil(EC.elementToBeClickable(algorithm),{timeout: 5000});
    $(algorithm).click();
    browser.waitUntil(EC.elementToBeClickable(PoWoption),{timeout: 5000});
    $(PoWoption).click();
    expect($(PoWBtn).isDisplayed()).to.equal(true);

    //followed by "+ Add Filter"
    //toggle "Mineable"
    browser.waitUntil(EC.elementToBeClickable(moreFilter),{timeout: 5000});
    $(moreFilter).click();
    browser.waitUntil(EC.presenceOf(mineable),{timeout: 5000});
    $(mineable).click();

    //then select "All Cryptocurrencies"
    //select "Coins"
    browser.waitUntil(EC.elementToBeClickable(allcc),{timeout: 5000});
    $(allcc).click();
    //browser.waitUntil(EC.presenceOf(coins),{timeout: 5000});
    $(coins).click();
    expect($(coinsChk).isDisplayed()).to.equal(true);

    //then select price and set minimum value to 100 and maximum to 10,000
    $(priceButton).click();
    $(pricemin).setValue(100);
    $(pricemax).setValue(10000);
    $(applyFilter).click();
    //browser.pause(2000);
    $(showResults).click();
    browser.pause(2000);
}

const compareTableData = () => {
    const tableElement = $(table);
    const rows = tableElement.$$(tableRows);
    //console.log("  No of rows --- ", rows.length);
    for (const entry of rows) {
        let rowdata = {};
        rowdata['name'] =  ((entry.$$('td')[rowIndexes.name]).getText()).replace('\n', '-');
        rowdata['price'] =  ((entry.$$('td')[rowIndexes.price]).getText()).replace('\n', '-');
        actualTableData.push(rowdata);
    }

    //console.log(JSON.stringify(actualTableData));
    //console.log(JSON.stringify(expectedTableData));
    expect(expectedTableData).to.deep.include(actualTableData);

    //Sample Output : Not sure what needed to be compared
    //[chrome 104.0.5112.101 windows #0-0] expected [ Array(20) ] to deep include [ { name: 'Ethereum-ETH', price: '$1,573.71' },
    //{ name: 'Monero-XMR', price: '$152.63' },
    //{ name: 'Bitcoin Cash-BCH', price: '$121.25' } ]

}

module.exports = {
    loadURL,
    handlePopups,
    selectRows,
    extractTableData,
    applyTableFilters,
    compareTableData
}