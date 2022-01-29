import React from "react";
import { Redirect } from "react-router-dom";
import { getEmployees } from "../services/employees";
import {
  getProjectById,
  editProject,
  createProject,
} from "../services/projects";
import ModalOK from "./ModalOK";
import SpinnerCenter from "./SpinnerCenter";
import "./static/projectEdit.css";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { registerLocale } from "react-datepicker";
import es from "date-fns/locale/es";
registerLocale("es", es);

class ProjectEdit extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      idProject: this.props.idProject,
      operation: this.props.operation,
      redirect: false,
      employees: [],
      isReady: false,
      showModalOK: false,
      errorMessages: {
        name: "",
        project: "",
      },
      formData: {
        name: null,
        description: null,
        leader_id: null,
        planned_start_date: null,
        planned_end_date: null,
        real_start_date: null,
        real_end_date: null,
        priority: "MEDIA",
        status: "ENESPERA",
      },
    };
  }
  async componentDidMount() {
    let emps = await getEmployees();
    this.setState({ employees: emps });

    //Obtengo para editar
    if (this.state.operation === "Editar") {
      let project = await getProjectById(this.state.idProject);
      this.setState({ formData: project });
    }
    this.setState({ isReady: true });
  }

  createProject = async () => {
    await createProject(this.state.formData);
    this.setState({ showModalOK: true });
    this.startTimer();
  };
  startTimer = () => {
    setTimeout(() => {
      this.setState({ redirect: true });
    }, 2000);
  };
  editProject = async () => {
    await editProject(this.state.idProject, this.state.formData);
    this.setState({ showModalOK: true });
    this.startTimer();
  };
  manageProject = () => {
    if (this.validateForm()) {
      this.state.operation === "Crear"
        ? this.createProject()
        : this.editProject();
    }
  };
  validateForm = () => {
    //Validación fecha planeada
    let planned_start_date = this.state.formData.planned_start_date;
    let planned_end_date = this.state.formData.planned_end_date;
    if (planned_start_date && planned_end_date) {
      planned_start_date = Date.parse(planned_start_date);
      planned_end_date = Date.parse(planned_end_date);
    }
    let wrongDatePlanned = false;
    if (planned_end_date < planned_start_date) wrongDatePlanned = true;
    //Validación fecha real
    let real_start_date = this.state.formData.real_start_date;
    let real_end_date = this.state.formData.real_end_date;
    if (real_start_date && real_end_date) {
      real_start_date = Date.parse(real_start_date);
      real_end_date = Date.parse(real_end_date);
    }
    let wrongDateReal = false;
    if (real_end_date < real_start_date) wrongDateReal = true;

    //Cargo los errores
    let name = this.state.formData.name;
    const hStyle = { color: "red" };
    this.setState({
      errorMessages: {
        name: !name ? <h6 style={hStyle}>Campo obligatorio</h6> : "",
        planned_end_date: wrongDatePlanned
          ? "Fecha de finalización planeada debe ser posterior"
          : "",
        real_end_date: wrongDateReal
          ? "Fecha de finalización real debe ser posterior"
          : "",
      },
    });
    if (name && !wrongDatePlanned && !wrongDateReal) return true;
    return false;
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
  render() {
    const {
      formData,
      idProject,
      isReady,
      operation,
      redirect,
      employees,
      errorMessages,
    } = this.state;

    if (!isReady) {
      return <SpinnerCenter />;
    }
    return (
      <body className="body">
        <div class="center_div w-50">
          <div className="form-group row">
            <div class="col-sm-5 col-form-label">
              <h2 class="login-header title-style">{operation} proyecto</h2>
            </div>
          </div>
          <div className="form-group row">
            <div class="col-sm-3 col-form-label">
              <label>Nombre(*):</label>
            </div>
            <div class="col-sm-8 col-form-label">
              <input
                maxlength="50"
                className="form-control "
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
              <label>Líder:</label>
            </div>
            <div class="col-sm-5 col-form-label">
              <select
                className="form-control"
                name="leader_id"
                onChange={this.handleChange}
                value={formData.leader_id}
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
              <label>Inicio planeado:</label>
            </div>
            <div class="col-sm-3 col-form-label">
              <div className="form-group">
                <DatePicker
                  className="form-control"
                  value={formData.planned_start_date}
                  onChange={(value) =>
                    this.handleDateChange("planned_start_date", value)
                  }
                  locale="es"
                  dateFormat="yyyy-MM-dd"
                />
              </div>
            </div>
            <div class="col-sm-3 col-form-label">
              <div className="icon-center">
                <i
                  className="bi bi-x-lg m-10"
                  onClick={() => this.clearDateValue("planned_start_date")}
                ></i>
              </div>
            </div>
          </div>
          <div className="form-group row">
            <div class="col-sm-3 col-form-label">
              <label>Finalización planeada</label>
            </div>
            <div class="col-sm-3 col-form-label">
              <div className="form-group">
                <DatePicker
                  className="form-control"
                  value={formData.planned_end_date}
                  onChange={(value) =>
                    this.handleDateChange("planned_end_date", value)
                  }
                  locale="es"
                  dateFormat="yyyy-MM-dd"
                />
              </div>
              <p className="p-corrido">{errorMessages["planned_end_date"]}</p>
            </div>
            <div class="col-sm-3 col-form-label">
              <div className="icon-center">
                <i
                  className="bi bi-x-lg m-10"
                  onClick={() => this.clearDateValue("planned_end_date")}
                ></i>
              </div>
            </div>
          </div>
          <div className="form-group row">
            <div class="col-sm-3 col-form-label">
              <label>Inicio real</label>
            </div>
            <div class="col-sm-3 col-form-label">
              <div className="form-group">
                <DatePicker
                  className="form-control"
                  value={formData.real_start_date}
                  onChange={(value) =>
                    this.handleDateChange("real_start_date", value)
                  }
                  locale="es"
                  dateFormat="yyyy-MM-dd"
                />
              </div>
            </div>
            <div class="col-sm-3 col-form-label">
              <div className="icon-center">
                <i
                  className="bi bi-x-lg m-10"
                  onClick={() => this.clearDateValue("real_start_date")}
                ></i>
              </div>
            </div>
          </div>
          <div className="form-group row">
            <div class="col-sm-3 col-form-label">
              <label>Finalización real</label>
            </div>
            <div class="col-sm-3 col-form-label">
              <div className="form-group">
                <DatePicker
                  className="form-control"
                  value={formData.real_end_date}
                  onChange={(value) =>
                    this.handleDateChange("real_end_date", value)
                  }
                  locale="es"
                  dateFormat="yyyy-MM-dd"
                />
              </div>
              <p className="p-corrido">{errorMessages["real_end_date"]}</p>
            </div>
            <div class="col-sm-3 col-form-label">
              <div className="icon-center">
                <i
                  className="bi bi-x-lg m-10"
                  onClick={() => this.clearDateValue("real_end_date")}
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
                <option value="ENESPERA">En espera</option>
                <option value="INICIADO">Inciado</option>
                <option value="ENPROGRESO">En progreso</option>
                <option value="ENTRANSICION">En transición</option>
                <option value="COMPLETADO">Completado</option>
              </select>
            </div>
          </div>
          <p>(*) Indica campo obligatorio</p>
          <div className="form-group row div-central">
            <div class="col-sm-5 col-form-label">
              <button
                type="button"
                className="btn create-button"
                onClick={() => {
                  this.manageProject();
                }}
              >
                {"Guardar"}
              </button>
              {operation === "Editar" && (
                <button
                  type="button"
                  className="btn btn-info"
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
        {redirect && (
          <Redirect
            to={
              operation === "Crear" ? "/proyectos/" : "/proyectos/" + idProject
            }
          />
        )}
        <ModalOK
          message="Proyecto guardado correctamente!"
          show={this.state.showModalOK}
        />
      </body>
    );
  }
}

export default ProjectEdit;
