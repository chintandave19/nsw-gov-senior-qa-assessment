@api @task3
Feature: Open Library Author API Validation
  As a tester
  I want to verify that the Open Library Author API returns correct metadata
  So that I can ensure the data integrity of the author database

  Scenario: Validate specific author details for Sachi Rautroy
    Given I fetch details for author "OL1A"
    Then the "personal_name" should be "Sachi Rautroy"
    And the "alternate_names" should contain "Yugashrashta Sachi Routray"

#   Scenario Outline: Validate multiple author attributes
#     Given I fetch details for author "OL1A"
#     Then the "<key>" should be "<expected_value>"

#     Examples:
#       | author_id | key         | expected_value  |
#       | OL1A      | birth_date  | 1916            |
#       | OL1A      | type.key    | /type/author    |