Feature: Ask for a specific Resource
  As project leader
  I want to ask for a specific resource
  In order to assign it to a task

  Scenario: Asking for a Resource
    Given i want resource with id 1
    When i ask for resource with id 1
    Then i get the correct resource with his first and last name

  Scenario: Asking for non existing Resource
    Given i want a resource that doesnt exist
    When i ask for it
    Then i get a message saying that the resource doesnt exist