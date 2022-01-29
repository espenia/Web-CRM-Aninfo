import React from "react";
import TaskEdit from "./TaskEdit";
import { capitalize } from "../services/helpers";
import "./static/breadcrumb.css";

export default function TaskCreateContainer(props) {
  const from = props.match.params.from;
  const operation = props.match.params.operation;
  const idTicket = props.match.params.idTicket;

  return (
    <body className="for-breadcrumb">
      <div className="pt-1">
        <nav aria-label="breadcrumb">
          <ol class="breadcrumb ol-bread">
            <li class="breadcrumb-item">
              <i href="/home" class="bi bi-house-door-fill m-2" />
              <a href="/home">Inicio</a>
            </li>
            <li class="breadcrumb-item active" aria-current="page">
              Crear tarea
            </li>
          </ol>
        </nav>
      </div>
      <TaskEdit
        from={capitalize(from)}
        operation={capitalize(operation)}
        idTicket={idTicket}
      />
    </body>
  );
}
