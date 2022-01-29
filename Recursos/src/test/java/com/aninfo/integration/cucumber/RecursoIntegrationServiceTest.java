package com.aninfo.integration.cucumber;

import com.aninfo.RecursoController;
import com.aninfo.model.Recurso;
import com.aninfo.service.RecursoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.test.context.ContextConfiguration;
import org.springframework.test.context.web.WebAppConfiguration;

import java.util.Collection;

@ContextConfiguration(classes = RecursoController.class)
@WebAppConfiguration
public class RecursoIntegrationServiceTest {

    @Autowired
    RecursoService recursoService;

    Collection<Recurso> getRecursos() throws Throwable {return recursoService.getRecursos(); }
    Recurso getRecursoByLegajo(Long legajo) throws Throwable { return recursoService.getRecursoByLegajo(legajo); }

}
