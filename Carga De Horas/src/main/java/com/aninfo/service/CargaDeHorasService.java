package com.aninfo.service;

import com.aninfo.exceptions.DateNotBeforeToday;
import com.aninfo.exceptions.FieldsNotFilled;
import com.aninfo.exceptions.HoursNotValid;
import com.aninfo.exceptions.HoursSumOver24;
import com.aninfo.model.CargaDeHoras;
import com.aninfo.repository.CargaDeHorasRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.*;

@Service
public class CargaDeHorasService {

    @Autowired
    private CargaDeHorasRepository cargaDeHorasRepository;

    public boolean validate(CargaDeHoras carga) throws Throwable {
        if (carga.getHoras() <= 0 || carga.getHoras() > 24) {
            throw new HoursNotValid("La cantidad de horas no es valida");
        }

        Collection<CargaDeHoras> onDate = cargaDeHorasRepository.findByFechaAndLegajoPersona(carga.getFecha(), carga.getLegajoPersona());
        Iterator<CargaDeHoras> iterator = onDate.iterator();

        double total = 0;

        while(iterator.hasNext()){
            CargaDeHoras horas = iterator.next();
            total += horas.getHoras();
        }

        if (total + carga.getHoras() > 24){
            throw new HoursSumOver24("La cantidad de horas en el día ingresado es mayor a 24");
        }

        Date today = Calendar.getInstance().getTime();

        if (carga.getFecha().after(today)){
            throw new DateNotBeforeToday("La fecha especificada es mayor a la actual");
        }

        if (carga.getNombreTarea() == "")
            throw new FieldsNotFilled("Por favor complete todos los campos");

        return true;
    }

    @Transactional
    public CargaDeHoras createCargaDeHoras(CargaDeHoras carga) throws Throwable {

        validate(carga);

        cargaDeHorasRepository.save(carga);

        return carga;
    }

    public Collection<CargaDeHoras> getCargasDeHoras() {
        Collection<CargaDeHoras> cargas = new ArrayList<>();
        cargaDeHorasRepository.findAll().forEach(cargas::add);
        return cargas;
    }

    public Optional<CargaDeHoras> findById(Long id) {
        return cargaDeHorasRepository.findById(id);
    }

    public void save(CargaDeHoras carga) { cargaDeHorasRepository.save(carga); }

    public void deleteById(Long id) {
        cargaDeHorasRepository.deleteById(id);
    }

    public Collection<CargaDeHoras> findByLegajo(Long legajo) { return cargaDeHorasRepository.findByLegajoPersona(legajo); }

    public Collection<CargaDeHoras> findByFechaBetween(Date desde, Date hasta, long legajo) {
        return cargaDeHorasRepository.findByFechaBetweenAndLegajoPersona(desde, hasta, legajo);
    }
}
