package com.aninfo.integration.cucumber;

import com.aninfo.CargaDeHorasController;
import com.aninfo.model.CargaDeHoras;
import com.aninfo.service.CargaDeHorasService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.test.context.ContextConfiguration;
import org.springframework.test.context.web.WebAppConfiguration;

import java.util.Date;

@ContextConfiguration(classes = CargaDeHorasController.class)
@WebAppConfiguration
public class CargaDeHorasIntegrationServiceTest {

    @Autowired
    CargaDeHorasService cargaDeHorasService;

    CargaDeHoras createCarga(Double hours, Long task, Long project, Date date, Long legajo, String nombre) throws Throwable {
        return cargaDeHorasService.createCargaDeHoras(new CargaDeHoras(hours, task, project, date, legajo, nombre));
    }

}
