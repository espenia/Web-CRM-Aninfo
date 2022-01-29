import React from "react";
import { getProjects } from "../services/projects";
import SpinnerCenter from "./SpinnerCenter";
import SearchForm from "./SearchForm";
import ResultMessage from "./ResultMessage";
import { Link } from "react-router-dom";
import {
  readableStatus,
  readablePriority,
  replaceIfEmpty,
} from "../services/helpers";

class Projects extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      projects: [],
      isReady: false,
    };
  }
  async componentDidMount() {
    const response = await getProjects("");
    this.setState({ projects: response, isReady: true });
  }
  submitSearch = async (searchTerm) => {
    this.setState({ isReady: false });
    const response = await getProjects(searchTerm);
    this.setState({ projects: response, isReady: true });
  };
  render() {
    const { isReady, projects } = this.state;
    if (!isReady) {
      return <SpinnerCenter />;
    }
    return (
      <>
        <div class="row pl-3">
          <div class="col">
            <h3>Proyectos</h3>
          </div>
          <div class="col">
            <SearchForm getByName={this.submitSearch} />
          </div>
          <Link to={`/proyectos/proyecto/nuevo`}>
            <button
              type="button"
              className="btn btn-success add-task-button"
              title="Crear proyecto"
            >
              Crear proyecto
            </button>
          </Link>
        </div>
        {isReady && !projects.length && (
          <ResultMessage message="No se encontraron proyectos." />
        )}
        <table class="table table-hover centrada-borde">
          <thead>
            <tr>
              <th style={{ width: "5%" }} scope="col">
                Id
              </th>
              <th style={{ width: "19%" }} scope="col">
                Nombre
              </th>
              <th style={{ width: "10%" }} scope="col">
                Inicio planeado
              </th>
              <th style={{ width: "10%" }} scope="col">
                F. Fin planeado
              </th>
              <th style={{ width: "10%" }} scope="col">
                F. Inicio real
              </th>
              <th style={{ width: "10%" }} scope="col">
                F. Fin real
              </th>
              <th className="text-center" style={{ width: "10%" }} scope="col">
                Horas consumidas
              </th>
              <th style={{ width: "8%" }} scope="col">
                Prioridad
              </th>
              <th style={{ width: "8%" }} scope="col">
                Estado
              </th>
              <th className="text-center" style={{ width: "10%" }} scope="col">
                Acción
              </th>
            </tr>
          </thead>
          <tbody>
            {projects.map((project) => (
              <tr key={project.id}>
                <th scope="row">{project.id}</th>
                <td>{project.name}</td>
                <td>{replaceIfEmpty(project.planned_start_date)}</td>
                <td>{replaceIfEmpty(project.planned_end_date)}</td>
                <td>{replaceIfEmpty(project.real_start_date)}</td>
                <td>{replaceIfEmpty(project.real_end_date)}</td>
                <td className="text-center">{project.total_hours}</td>
                <td>{readablePriority(project.priority)}</td>
                <td>{readableStatus(project.status)}</td>
                <td>
                  <div className="text-center">
                    <Link to={`/proyectos/${project.id}`}>
                      <button type="button" className="btn btn-info">
                        Administrar
                      </button>
                    </Link>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </>
    );
  }
}

export default Projects;
