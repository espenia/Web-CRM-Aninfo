Feature: Charge hours into a task
  As a developer
  I want to charge hours into a project
  In order to let everyone know how much I have worked on it

  Scenario: Hours invalid because it is 0
    Given developer 1
    When he charges 0 hours into project 1 task 1 name Development on 2021-01-22
    Then he gets a message saying that the amount of hours is invalid

  Scenario: Hours invalid because it is over 24
    Given developer 1
    When he charges 25 hours into project 1 task 1 name Development on 2021-01-22
    Then he gets a message saying that the amount of hours is invalid

  Scenario: Charge Successful
    Given developer 1
    When he charges 5 hours into project 1 task 1 name Development on 2021-01-22
    Then he gets a message saying that the charge is successful

  Scenario: Hours over twenty-four in same task
    Given developer 1
    When he charges 5 hours into project 1 task 1 name Development on 2021-01-22
    And he charges 20 more hours into the same task and same date
    Then he gets a message saying that the amount of hours for the day is over 24

  Scenario: Hours over twenty-four in different tasks
    Given developer 1
    When he charges 15 hours into project 1 task 1 name Development on 2021-01-22
    When he charges 10 hours into project 1 task 2 name Deployment on 2021-01-22
    Then he gets a message saying that the amount of hours for the day is over 24
