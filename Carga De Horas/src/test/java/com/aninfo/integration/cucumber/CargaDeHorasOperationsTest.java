package com.aninfo.integration.cucumber;

import com.aninfo.exceptions.HoursNotValid;
import com.aninfo.exceptions.HoursSumOver24;
import com.aninfo.model.CargaDeHoras;
import cucumber.api.java.After;
import cucumber.api.java.Before;
import cucumber.api.java.en.And;
import cucumber.api.java.en.Given;
import cucumber.api.java.en.Then;
import cucumber.api.java.en.When;

import java.text.SimpleDateFormat;
import java.util.Date;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertNotNull;

public class CargaDeHorasOperationsTest extends CargaDeHorasIntegrationServiceTest {

    private CargaDeHoras carga;
    private HoursNotValid hnv;
    private HoursSumOver24 o24;
    Date date;
    String name;
    Long project;
    Long task;
    Long legajo;

    @Before
    public void setup() {
        System.out.println("Before any test execution");
    }

    @Given("^developer (\\d+)$")
    public void developer_working_on_project_task(Long id)  {
        this.legajo = id;
    }

    @When("^he charges (\\d+) hours into project (\\d+) task (\\d+) name (.*) on (.*)$")
    public void he_charges_hours_into_project_task_name_on(int hours, int proj, int task, String name, String date) throws Throwable {
        try {
            SimpleDateFormat sdformat = new SimpleDateFormat("yyyy-MM-dd");
            this.date = sdformat.parse(date);
            this.name = name;
            this.project = Long.valueOf(proj);
            this.task = Long.valueOf(task);
            carga = createCarga(Double.valueOf(hours), Long.valueOf(task), Long.valueOf(proj), sdformat.parse(date), this.legajo, name);
        } catch (HoursNotValid hnv) {
            this.hnv = hnv;
        }
        catch (HoursSumOver24 o24){
            this.o24 = o24;
        }
    }

    @Then("^he gets a message saying that the amount of hours is invalid$")
    public void he_gets_a_message_saying_that_the_amount_of_hours_is_invalid() {

        assertNotNull(hnv);
        assertEquals(null, o24);
    }

    @Then("^he gets a message saying that the charge is successful$")
    public void he_gets_a_message_saying_that_the_charge_is_successful() {

        assertNotNull(this.carga);
        assertEquals(null, hnv);
        assertEquals(null, o24);
    }

    @And("he charges (\\d+) more hours into the same task and same date")
    public void he_charges_more_hours_into_the_same_task_and_same_date(int hours) throws Throwable{
        try {
            carga = createCarga(Double.valueOf(hours), this.task, this.project, this.date, this.legajo, this.name);
        } catch (HoursSumOver24 o24) {
            this.o24 = o24;
        }
    }

    @Then("he gets a message saying that the amount of hours for the day is over 24")
    public void he_gets_a_message_saying_that_the_amount_of_hours_for_the_day_is_over_24(){
        assertNotNull(o24);
        assertEquals(hnv, null);
    }

    @After
    public void tearDown() {
        System.out.println("After all test execution");
    }
}
