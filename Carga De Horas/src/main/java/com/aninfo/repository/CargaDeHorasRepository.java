package com.aninfo.repository;

import com.aninfo.model.CargaDeHoras;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;

import java.util.Collection;
import java.util.Date;
import java.util.List;

@RepositoryRestResource
public interface CargaDeHorasRepository extends JpaRepository<CargaDeHoras, Long> {

    List<CargaDeHoras> findByLegajoPersona(Long legajo);

    List<CargaDeHoras> findByFechaBetweenAndLegajoPersona(Date desde, Date hasta, long legajo);

    List<CargaDeHoras> findByFechaAndLegajoPersona(Date fecha, Long legajo);
}
