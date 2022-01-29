import React from "react";
import TaskEdit from "./TaskEdit";
import { capitalize } from "../services/helpers";
import "./static/breadcrumb.css";

export default function TaskEditContainer(props) {
  const idProject = props.match.params.idProject;
  const idTask = props.match.params.idTask;
  const operation = props.match.params.operation;
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
              {capitalize(operation)} tarea
            </li>
          </ol>
        </nav>
      </div>
      <TaskEdit
        idProject={idProject}
        idTask={idTask}
        operation={capitalize(operation)}
      />
    </body>
  );
}
