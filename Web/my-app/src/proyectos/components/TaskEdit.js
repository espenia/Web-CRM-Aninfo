import React from "react";
import { Redirect } from "react-router-dom";
import { createTask, editTask, getTaskById } from "../services/tasks";
import { getEmployees } from "../services/employees";
import { getProjects } from "../services/projects";
import SpinnerCenter from "./SpinnerCenter";
import ModalOK from "./ModalOK";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { registerLocale } from "react-datepicker";
import es from "date-fns/locale/es";
import "./static/taskEdit.css";
registerLocale("es", es);

class TaskEdit extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      idProject: this.props.idProject,
      idTask: this.props.idTask,
      idTicket: this.props.idTicket,
      from: this.props.from,
      operation: this.props.operation,
      idProjectToCreate: "",
      redirect: false,
      employees: [],
      isReady: false,
      showModalOK: false,
      startDate: "",
      errorMessages: {
        name: "",
        project: "",
      },
      formData: {
        task_id: "",
        name: "",
        description: "",
        employee_id: null,
        created_at: null,
        start_date: null,
        end_date: null,
        priority: "MEDIA",
        status: "CREADA",
      },
    };
  }
  async componentDidMount() {
    let emps = await getEmployees();
    this.setState({ employees: emps });

    let prjs = await getProjects("");
    this.setState({ projects: prjs });

    //Obtengo para editar
    if (this.state.operation === "Editar") {
      let task = await getTaskById(this.state.idProject, this.state.idTask);
      this.setState({ formData: task });
    }
    this.setState({ isReady: true });
  }
  startTimer = () => {
    setTimeout(() => {
      this.setState({ redirect: true });
    }, 2000);
  };

  createTaskOnProject = async () => {
    delete this.state.formData.task_id;
    delete this.state.formData.created_at;

    let response = await createTask(this.state.idProject, this.state.formData);
    this.setState({ idTaskCreated: response.task_id, showModalOK: true });
    this.startTimer();
  };
  manageTask = () => {
    if (this.validateForm()) {
      this.state.operation === "Crear"
        ? this.createTaskOnProject()
        : this.editTaskOnProject();
    }
  };
  validateForm = () => {
    let name = this.state.formData.name;
    let idProject = this.state.idProject;
    let start_date = this.state.formData.start_date;
    let end_date = this.state.formData.end_date;
    if (start_date & end_date) {
      start_date = Date.parse(start_date);
      end_date = Date.parse(end_date);
    }

    let wrongDate = false;
    const hStyle = { color: "red" };
    if (end_date < start_date) wrongDate = true;
    this.setState({
      errorMessages: {
        name: !name ? <h6 style={hStyle}>Campo obligatorio</h6> : "",
        project: !idProject ? <h6 style={hStyle}>Campo obligatorio</h6> : "",
        end_date: wrongDate ? (
          <h6 style={hStyle}>Fecha de finalización debe ser posterior</h6>
        ) : (
          ""
        ),
      },
    });
    if (name && idProject && !wrongDate) return true;
    return false;
  };
  editTaskOnProject = async () => {
    delete this.state.formData.task_id;
    delete this.state.formData.created_at;
    await editTask(
      this.state.idProject,
      this.state.idTask,
      this.state.formData
    );
    this.setState({ showModalOK: true });
    this.startTimer();
  };

  handleChange = (e) => {
    // La api acepta null para ENUM, numeros o fechas.
    let inputValue = e.target.value;
    if (inputValue === "" || inputValue === "Ninguno") {
      inputValue = null;
    }
    this.setState({
      formData: {
        ...this.state.formData,
        [e.target.name]: inputValue,
      },
      [e.target.name]: inputValue,
    });
  };

  handleDateChange = (dateName, dateValue) => {
    this.setState({
      formData: {
        ...this.state.formData,
        [dateName]: dateValue.toISOString().slice(0, 10),
      },
    });
  };

  clearDateValue = (dateName) => {
    this.setState({
      formData: {
        ...this.state.formData,
        [dateName]: null,
      },
    });
  };

  render() {
    const {
      formData,
      idProject,
      isReady,
      operation,
      from,
      redirect,
      projects,
      employees,
      errorMessages,
    } = this.state;

    if (!isReady) {
      return <SpinnerCenter />;
    }
    return (
      <body className="body">
        <div class="center_div w-50 body">
          <div className="form-group row">
            <div class="col-sm-5 col-form-label">
              <h2 class="login-header task-title-style">{operation} tarea</h2>
            </div>
          </div>
          <div className="form-group row">
            <div class="col-sm-3 col-form-label">
              <label>Proyecto(*):</label>
            </div>
            <div class="col-sm-8 col-form-label">
              <select
                className="form-control"
                name="idProject"
                onChange={this.handleChange}
                value={idProject}
                disabled={!from ? true : false}
              >
                <option>Ninguno</option>
                {projects.map((project) => (
                  <option key={project.id} value={project.id}>
                    {project.name}
                  </option>
                ))}
              </select>
              <p className="p-corrido">{errorMessages["project"]}</p>
            </div>
          </div>
          <div className="form-group row">
            <div class="col-sm-3 col-form-label">
              <label>Nombre(*):</label>
            </div>
            <div class="col-sm-8 col-form-label">
              <input
                maxlength="50"
                className="form-control"
                type="text"
                name="name"
                value={formData.name}
                onChange={this.handleChange}
              />
              <p className="p-corrido">{errorMessages["name"]}</p>
            </div>
          </div>
          <div className="form-group row">
            <div class="col-sm-3 col-form-label">
              <label>Descripción:</label>
            </div>
            <div class="col-sm-8 col-form-label">
              <textarea
                maxlength="1024"
                className="form-control"
                type="text"
                name="description"
                value={formData.description}
                onChange={this.handleChange}
              />
            </div>
          </div>
          <div className="form-group row">
            <div class="col-sm-3 col-form-label">
              <label>Asignado a:</label>
            </div>
            <div class="col-sm-5 col-form-label">
              <select
                className="form-control"
                name="employee_id"
                onChange={this.handleChange}
                value={formData.employee_id}
              >
                <option>Ninguno</option>
                {employees.map((employee) => (
                  <option key={employee.legajo} value={employee.legajo}>
                    {employee.apellido}, {employee.nombre}
                  </option>
                ))}
              </select>
            </div>
          </div>
          <div className="form-group row">
            <div class="col-sm-3 col-form-label">
              <label>Fecha de inicio:</label>
            </div>
            <div class="col-sm-3 col-form-label">
              <DatePicker
                className="form-control"
                value={formData.start_date}
                onChange={(value) => this.handleDateChange("start_date", value)}
                dateFormat="yyyy-MM-dd"
                locale="es"
                isClearable
              />
            </div>
            <div class="col-sm-3 col-form-label">
              <div className="icon-center">
                <i
                  className="bi bi-x-lg m-10"
                  onClick={() => this.clearDateValue("start_date")}
                ></i>
              </div>
            </div>
          </div>
          <div className="form-group row">
            <div class="col-sm-3 col-form-label">
              <label>Fecha de finalización:</label>
            </div>
            <div class="col-sm-3 col-form-label">
              <div className="form-group">
                <DatePicker
                  className="form-control"
                  value={formData.end_date}
                  onChange={(value) => this.handleDateChange("end_date", value)}
                  locale="es"
                  dateFormat="yyyy-MM-dd"
                />
              </div>
              <p className="p-corrido">{errorMessages["end_date"]}</p>
            </div>
            <div className="col-sm-3 col-form-label">
              <div className="icon-center">
                <i
                  className="bi bi-x-lg m-10"
                  onClick={() => this.clearDateValue("end_date")}
                ></i>
              </div>
            </div>
          </div>
          <div className="form-group row">
            <div class="col-sm-3 col-form-label">
              <label>Prioridad:</label>
            </div>
            <div class="col-sm-3 col-form-label">
              <select
                className="form-control"
                name="priority"
                onChange={this.handleChange}
                value={formData.priority}
              >
                <option value="BAJA">Baja</option>
                <option value="MEDIA">Media</option>
                <option value="ALTA">Alta</option>
              </select>
            </div>
          </div>
          <div className="form-group row">
            <div class="col-sm-3 col-form-label">
              <label>Estado:</label>
            </div>
            <div class="col-sm-3 col-form-label">
              <select
                className="form-control"
                name="status"
                onChange={this.handleChange}
                value={formData.status}
              >
                <option value="CREADA">Creada</option>
                <option value="ASIGNADA">Asignada</option>
                <option value="ENPROGRESO">En progreso</option>
                <option value="COMPLETADA">Completada</option>
                <option value="BLOQUEADA">Bloqueada</option>
              </select>
            </div>
          </div>
          <p>(*) Indica campo obligatorio</p>
          <div className="form-group row div-central">
            <div class="col-sm-5 col-form-label">
              <button
                type="button"
                className="btn create-button-task"
                onClick={() => {
                  this.manageTask();
                }}
              >
                {"Guardar"}
              </button>
              {!from && (
                <button
                  type="button"
                  className="btn cancel-task-button"
                  onClick={() => {
                    this.setState({ redirect: true });
                  }}
                  title="Cancelar"
                >
                  Cancelar
                </button>
              )}
            </div>
          </div>
        </div>
        {redirect && from && (
          <Redirect
            to={
              from === "Soporte"
                ? "/soporte/tickets/" +
                  this.state.idTicket +
                  "/" +
                  this.state.idTaskCreated
                : "/proyectos/" + idProject
            }
          />
        )}
        {redirect && !from && <Redirect to={"/proyectos/" + idProject} />}
        <ModalOK
          message="Tarea guardada correctamente!"
          show={this.state.showModalOK}
        />
      </body>
    );
  }
}

export default TaskEdit;
