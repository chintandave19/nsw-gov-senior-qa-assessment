@ui @accessibility @ignore
Feature: Stamp Duty Page Accessibility Validation
  As a government service provider
  I want to ensure that the Stamp Duty transaction pages are accessible
  So that all citizens, including those with disabilities, can use the service

  Background:
    Given I am on the Service NSW Stamp Duty page

  Scenario: Verify accessibility on the Service NSW landing page
    Then I perform an accessibility check on the Service NSW landing page

#   Scenario: Verify accessibility on the redirected Revenue NSW calculator
#     When I click the Check Online button
#     Then I should be redirected to the Revenue NSW calculator page
#     Then I perform an accessibility check on the 'Revenue NSW calculator' page