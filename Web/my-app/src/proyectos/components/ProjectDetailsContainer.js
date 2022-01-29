import React from "react";
import ProjectDetails from "./ProjectDetails";
import "./static/breadcrumb.css";

export default function ProjectDetailsContainer(props) {
  const idProject = props.match.params.idProject;
  return (
    <body className="for-breadcrumb">
      <div className="pt-1">
        <nav aria-label="breadcrumb">
          <ol class="breadcrumb ol-bread">
            <li className="breadcrumb-item">
              <i href="/home" className="bi bi-house-door-fill m-2" />
              <a href="/home">Inicio</a>
            </li>
            <li className="breadcrumb-item">
              <a href="/proyectos">Proyectos</a>
            </li>
            <li className="breadcrumb-item active" aria-current="page">
              Detalles del proyecto(Id.{idProject})
            </li>
          </ol>
        </nav>
      </div>
      <ProjectDetails idProject={props.match.params.idProject} />
    </body>
  );
}
