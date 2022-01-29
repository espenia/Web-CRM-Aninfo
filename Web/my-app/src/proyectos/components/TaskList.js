import React from "react";
import SpinnerCenter from "./SpinnerCenter";
import SearchForm from "./SearchForm";
import { Link } from "react-router-dom";
import { getTasks, deleteTaskById } from "../services/tasks";
import {
  readableStatus,
  readablePriority,
  replaceIfEmpty,
} from "../services/helpers";
import { Modal, ModalBody, ModalFooter } from "react-bootstrap";
import ResultMessage from "./ResultMessage";
import "./static/taskList.css";

class TaskList extends React.Component {
  constructor(props) {
    super(props);
    this.deleteTask = this.deleteTask.bind(this);
    this.state = {
      idProject: this.props.idProject,
      tasks: [],
      isReady: false,
      taskToDelete: "",
      showModalTask: false,
      taskSelectedDescription: "",
      taskSelectedName: "",
      showModalDescription: false,
    };
  }

  async componentDidMount() {
    this.getTaskList();
  }
  getTaskList = async () => {
    const tasksResponse = await getTasks(this.state.idProject, "");
    this.setState({ tasks: tasksResponse, isReady: true });
  };
  setTaskToDelete = (idTask) => {
    this.setState({ taskToDelete: idTask });
  };

  setTaskInfo = (name, description) => {
    this.setState({
      taskSelectedDescription: description,
      taskSelectedName: name,
      showModalDescription: true,
    });
  };
  submitSearch = async (searchTerm) => {
    this.setState({ isReady: false });
    const response = await getTasks(this.state.idProject, searchTerm);
    this.setState({ tasks: response, isReady: true });
  };
  deleteTask = async () => {
    this.setState({ isReady: false });
    await deleteTaskById(this.state.idProject, this.state.taskToDelete);
    this.setState({ showModalTask: false });
    this.getTaskList();
  };

  render() {
    const { idProject, tasks, isReady } = this.state;
    if (!isReady) {
      return <SpinnerCenter />;
    }
    return (
      <>
        <div class="row pl-3">
          <div class="col">
            <h3>Tareas del proyecto</h3>
          </div>
          <div class="col">
            <SearchForm getByName={this.submitSearch} />
          </div>
          <Link to={`/proyectos/${idProject}/tarea/crear`}>
            <button
              type="button"
              className="btn btn-success add-task-button"
              title="Agregar tarea"
            >
              Agregar Tarea
            </button>
          </Link>
        </div>
        <div className="">
          {isReady && !tasks.length && (
            <ResultMessage message="No se encontraron tareas." />
          )}
          <table className="table table-hover centrada-borde">
            <thead>
              <tr>
                <th style={{ width: "5%" }} scope="col">
                  Id
                </th>
                <th style={{ width: "22%" }} scope="col">
                  Nombre
                </th>
                <th style={{ width: "8%" }} scope="col">
                  Creación
                </th>
                <th style={{ width: "8%" }} scope="col">
                  Inicio
                </th>
                <th style={{ width: "8%" }} scope="col">
                  Finalización
                </th>
                <th style={{ width: "16%" }} scope="col">
                  Asigando a
                </th>
                <th style={{ width: "9%" }} scope="col">
                  Prioridad
                </th>
                <th style={{ width: "9%" }} scope="col">
                  Estado
                </th>
                <th
                  className="text-center"
                  style={{ width: "15%" }}
                  scope="col"
                >
                  Acciones
                </th>
              </tr>
            </thead>
            <tbody>
              {tasks.map((task) => (
                <tr key={task.task_id}>
                  <th scope="row">{task.task_id}</th>
                  <td>{task.name}</td>
                  <td>{task.created_at}</td>
                  <td>{replaceIfEmpty(task.start_date)}</td>
                  <td>{replaceIfEmpty(task.end_date)}</td>
                  <td>
                    {task.employee_id ? task.employee_name : "No asignado"}
                  </td>
                  <td>{readablePriority(task.priority)}</td>
                  <td>{readableStatus(task.status)}</td>
                  <td>
                    <div className="text-center">
                      <button
                        title="Ver descripción"
                        class="btn btn-primary button"
                        onClick={() => {
                          this.setTaskInfo(task.name, task.description);
                        }}
                      >
                        <i class="bi bi-eye"></i>
                      </button>
                      <Link
                        to={`/proyecto/${idProject}/${task.task_id}/editar`}
                      >
                        <button
                          type="button"
                          className="btn btn-info button"
                          title="Editar tarea"
                        >
                          <i class="bi bi-pencil-square"></i>
                        </button>
                      </Link>
                      <button
                        type="button"
                        title="Eliminar tarea"
                        onClick={() => {
                          this.setState({ showModalTask: true });
                          this.setTaskToDelete(task.task_id);
                        }}
                        className="btn delete-task-button"
                        key={task.task_id}
                      >
                        <i class="bi bi-trash"></i>
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <Modal show={this.state.showModalTask}>
          <Modal.Header>
            <Modal.Title>
              <p style={{ color: "Orange" }}>Alerta</p>
            </Modal.Title>
          </Modal.Header>
          <ModalBody>
            ¿Confirma la eliminación de la tarea seleccionada?
          </ModalBody>
          <ModalFooter>
            <button
              className="btn delete-task-button"
              onClick={() => this.deleteTask()}
            >
              Sí
            </button>
            <button
              className="btn btn-primary"
              onClick={() => {
                this.setState({ showModalTask: false });
              }}
            >
              No
            </button>
          </ModalFooter>
        </Modal>
        <Modal show={this.state.showModalDescription}>
          <Modal.Header>
            <Modal.Title>Tarea: {this.state.taskSelectedName}</Modal.Title>
          </Modal.Header>
          <ModalBody>
            {this.state.taskSelectedDescription === ""
              ? "Sin descripción"
              : this.state.taskSelectedDescription}
          </ModalBody>
          <ModalFooter>
            <button
              className="btn btn-secondary"
              onClick={() => {
                this.setState({ showModalDescription: false });
              }}
            >
              Cerrar
            </button>
          </ModalFooter>
        </Modal>
      </>
    );
  }
}

export default TaskList;
