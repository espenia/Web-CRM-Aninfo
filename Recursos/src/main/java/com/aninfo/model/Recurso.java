package com.aninfo.model;

import com.google.gson.annotations.SerializedName;

import javax.persistence.Entity;
import javax.persistence.Id;

@Entity
public class Recurso {

    @Id
    @SerializedName("legajo")
    private Long Legajo;
    private String Nombre;
    private String Apellido;

    public Recurso(Long legajo, String nombre, String apellido){
        this.Legajo = legajo;
        this.Nombre = nombre;
        this.Apellido = apellido;
    }

    public Recurso() {
    }

    public void setLegajo(Long legajo) {
        this.Legajo = legajo;
    }
    public Long getLegajo() {
        return Legajo;
    }

    public void setNombre(String nombre) {
        this.Nombre = nombre;
    }
    public String getNombre() {
        return Nombre;
    }

    public void setApellido(String apellido) {
        this.Apellido = apellido;
    }
    public String getApellido() {
        return Apellido;
    }
}
