Feature: CryptoCurrency Test

Scenario: Filter and Compare Crypto Currency Test

Given I navigate to homepage
When I select 20 rows
And I extract table data
And I Apply filters
Then I compare current table data with earlier data
