import React from "react";
import ProjectEdit from "./ProjectEdit";
import "./static/breadcrumb.css";

export default function ProjectEditContainer(props) {
  const idProject = props.match.params.idProject;
  return (
    <body className="for-breadcrumb">
      <div className="pt-1">
        <nav aria-label="breadcrumb">
          <ol class="breadcrumb ol-bread">
            <li class="breadcrumb-item">
              <i href="/home" class="bi bi-house-door-fill m-2" />
              <a href="/home">Inicio</a>
            </li>
            <li class="breadcrumb-item">
              <a href="/Proyectos">Proyectos</a>
            </li>
            <li class="breadcrumb-item">
              <a href={"/proyectos/" + idProject}>Proyecto {idProject}</a>
            </li>
            <li class="breadcrumb-item active" aria-current="page">
              Editar proyecto
            </li>
          </ol>
        </nav>
      </div>
      <ProjectEdit idProject={idProject} operation={"Editar"} />
    </body>
  );
}
