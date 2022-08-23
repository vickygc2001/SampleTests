const {Given,When,Then} = require('cucumber');
const homepage = require('../pages/home.page');

Given('I navigate to homepage',() => {
    homepage.loadURL();
    homepage.handlePopups();
});

When('I select {int} rows',(rows) => {
    homepage.selectRows(rows);
});

When('I extract table data', () => {
    homepage.extractTableData();
});

When('I Apply filters', () => {
    homepage.applyTableFilters();
});

Then('I compare current table data with earlier data', () => {
    homepage.compareTableData();
});