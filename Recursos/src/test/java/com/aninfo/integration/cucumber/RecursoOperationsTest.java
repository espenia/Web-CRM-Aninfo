package com.aninfo.integration.cucumber;

import cucumber.api.java.After;
import cucumber.api.java.Before;
import cucumber.api.java.en.Given;
import cucumber.api.java.en.Then;
import cucumber.api.java.en.When;
import com.aninfo.model.Recurso;
import com.aninfo.exceptions.LegajoNotFound;

import java.text.SimpleDateFormat;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertNotNull;

public class RecursoOperationsTest extends RecursoIntegrationServiceTest {

    Long legajo;
    Recurso rec;
    LegajoNotFound err;

    @Before
    public void setup() {
        System.out.println("Before any test execution");
    }

    @Given("^i want resource with id (\\d+)$")
    public void i_want_resource_with_id(int legajo){ this.legajo = Long.valueOf(legajo); }

    @When("^i ask for resource with id (\\d+)$")
    public void i_ask_for_resource_with_id(int legajo){
        try{
            rec = recursoService.getRecursoByLegajo(legajo);
        } catch (Throwable throwable) {
            err = (LegajoNotFound) throwable;
        }
    }

    @Then("^i get the correct resource with his first and last name$")
    public void i_get_the_correct_resource_with_his_first_and_last_name(){
        assertEquals(legajo, rec.getLegajo());
        assertNotNull(rec.getNombre());
        assertNotNull(rec.getApellido());
    }

    @Given("^i want a resource that doesnt exist$")
    public void i_want_a_resource_that_doesnt_exsit(){
        legajo = Long.valueOf(5);
    }

    @When("^i ask for it$")
    public void i_ask_for_it(){
        try{
            rec = recursoService.getRecursoByLegajo(legajo);
        } catch (Throwable throwable) {
            err = (LegajoNotFound) throwable;
        }
    }

    @Then("^i get a message saying that the resource doesnt exist$")
    public void i_get_a_message_saying_that_the_resource_doesnt_exsit(){
        assertNotNull(err);
    }

    @After
    public void tearDown() {
        System.out.println("After all test execution");
    }
}
