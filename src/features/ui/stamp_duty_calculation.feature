@ui @task1
Feature: Motor Vehicle Registration Duty Calculator
  As a vehicle owner
  I want to calculate the stamp duty for my vehicle registration
  So that I know the cost involved before visiting Service NSW

  Background:
    Given I am on the Service NSW Stamp Duty page

  Scenario: Calculate duty for a standard passenger vehicle
    When I click the Check Online button
    Then I should be redirected to the Revenue NSW calculator page
    When I select "Yes" for Is this registration for a passenger vehicle?
    And I enter Purchase price or value as "25000"
    And I click Calculate
    Then the duty payable should be calculated for a passenger vehicle: "Yes" with purchase price: "25000"

#   Scenario Outline: Calculate duty for different vehicle types and values
#     When I click the Check Online button
#     Then I should be redirected to the Revenue NSW calculator page
#     When I select "<vehicle_type>" for Is this registration for a passenger vehicle?
#     And I enter Purchase price or value as "<price>"
#     And I click Calculate
#     Then the duty payable should be calculated for a passenger vehicle: "<vehicle_type>" with purchase price: "<price>"

#     Examples:
#       | vehicle_type | price    |
#       | Yes          | 30000    |
#       | No           | 45000    |
#       | Yes          | 39,999   |
#       | No           | 1        |