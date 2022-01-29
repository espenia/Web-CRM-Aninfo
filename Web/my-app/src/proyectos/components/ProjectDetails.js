import React from "react";
import { getProjectById, deleteProjecyById } from "../services/projects";
import {
  readableStatus,
  readablePriority,
  replaceIfEmpty,
} from "../services/helpers";
import TaskList from "./TaskList";
import { Container } from "react-bootstrap";
import { Link, Redirect } from "react-router-dom";
import { Modal, ModalBody, ModalFooter } from "react-bootstrap";
import "./static/projectDetails.css";
import SpinnerCenter from "./SpinnerCenter";

class ProjectDetails extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isReady: false,
      idProject: this.props.idProject,
      projectInfo: "",
      showModalProject: false,
      redirect: false,
    };
  }

  async componentDidMount() {
    const projectResponse = await getProjectById(this.state.idProject);
    if (projectResponse)
      this.setState({ projectInfo: projectResponse, isReady: true });
  }

  deleteProject = async () => {
    await deleteProjecyById(this.state.idProject);
    this.setState({ showModalProject: false, redirect: true });
  };
  render() {
    const { idProject, isReady, redirect, projectInfo } = this.state;
    if (!isReady) {
      return <SpinnerCenter />;
    }
    return (
      <>
        <Container fluid>
          <div className="col">
            <h2>{projectInfo.name}</h2>
          </div>
          <table class="table project-table tabla-detalles">
            <tr>
              <th>Líder de proyecto: </th>
              <td>{replaceIfEmpty(projectInfo.leader_name)} </td>
              <th>Inicio planeado: </th>
              <td>{replaceIfEmpty(projectInfo.planned_start_date)}</td>
            </tr>
            <tr>
              <th>Estado: </th>
              <td>{readableStatus(projectInfo.status)}</td>
              <th>Fin planeado: </th>
              <td>{replaceIfEmpty(projectInfo.planned_end_date)}</td>
            </tr>
            <tr>
              <th>Horas consumidas: </th>
              <td>{projectInfo.total_hours} </td>
              <th>Inicio real: </th>
              <td>{replaceIfEmpty(projectInfo.real_start_date)}</td>
            </tr>
            <tr>
              <th>Prioridad: </th>
              <td>{readablePriority(projectInfo.priority)} </td>
              <th>Fin real: </th>
              <td>{replaceIfEmpty(projectInfo.real_end_date)}</td>
            </tr>
          </table>
          <table class="table project-table tabla-detalles">
            <tr>
              <th>Descripción: </th>
              <td>{projectInfo.description}</td>
            </tr>
          </table>
          <Link to={`/proyectos/${idProject}/editar`}>
            <button
              type="button"
              className="btn btn-info"
              title="Editar datos del proyecto"
            >
              Editar proyecto
            </button>
          </Link>
          <button
            onClick={() => this.setState({ showModalProject: true })}
            type="button"
            className="btn delete-button"
            title="Eliminar proyecto"
          >
            Eliminar proyecto
          </button>
        </Container>
        <hr />

        <span class="border border-info">
          <TaskList idProject={this.state.idProject} />
        </span>
        <Modal show={this.state.showModalProject}>
          <Modal.Header>
            <Modal.Title>
              <p style={{ color: "Orange" }}>Alerta</p>
            </Modal.Title>
          </Modal.Header>
          <ModalBody>
            ¿Confirma la eliminación del proyecto {projectInfo.name}? Se
            eliminará el proyecto y sus tareas.
          </ModalBody>
          <ModalFooter>
            <button
              className="btn delete-proyect-button"
              onClick={() => this.deleteProject()}
            >
              Sí
            </button>
            <button
              className="btn btn-primary"
              onClick={() => {
                this.setState({ showModalProject: false });
              }}
            >
              No
            </button>
          </ModalFooter>
        </Modal>
        {redirect && <Redirect to="/proyectos" />}
      </>
    );
  }
}

export default ProjectDetails;
