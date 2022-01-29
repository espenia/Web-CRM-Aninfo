package com.aninfo.model;

import com.google.gson.Gson;
import com.google.gson.JsonObject;

import javax.persistence.*;
import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.net.HttpURLConnection;
import java.net.URL;
import java.text.SimpleDateFormat;
import java.util.Calendar;
import java.util.Date;

@Entity
public class CargaDeHoras {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long idCarga;
    private Double horas;
    private Long tarea;
    private Long proyecto;
    @Temporal(TemporalType.DATE)
    private Date fecha;
    private Long legajoPersona;
    private String nombreTarea;

    public CargaDeHoras(){
    }

    public CargaDeHoras(Double hours, Long task, Long project, Date date, Long legajo, String nombre) throws Throwable {
        this.horas = hours;
        SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd");
        this.fecha = sdf.parse(sdf.format(date));
        this.tarea = task;
        this.proyecto = project;
        this.legajoPersona = legajo;
        this.nombreTarea = nombre;
    }

    public Long getIdCarga() {
        return idCarga;
    }

    public void setIdCarga(Long id) {
        this.idCarga = id;
    }

    public Double getHoras() {
        return horas;
    }

    public void setHoras(Double hours) {
        this.horas = hours;
    }

    public Date getFecha(){ return fecha; }

    public void setFecha(Date date) { this.fecha = date; }

    public Long getTarea(){ return tarea; }

    public void setTarea(Long task){ this.tarea = task; }

    public Long getProyecto(){ return proyecto; }

    public void setProyecto(Long project){ this.proyecto = project; }

    public Long getLegajoPersona(){ return legajoPersona; }

    public void setLegajoPersona(Long legajo){ this.legajoPersona = legajo; }

    public String getNombreTarea() { return nombreTarea; }

    public void setNombreTarea(String nombre){ this.nombreTarea = nombre; }

}
