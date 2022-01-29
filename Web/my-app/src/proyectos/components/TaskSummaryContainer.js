import React from "react";
import { getProjects } from "../services/projects";
import SpinnerCenter from "./SpinnerCenter";
import ResultMessage from "./ResultMessage";
import TaskSummary from "./TaskSummary";

class TaskSummaryContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      projects: [],
      isReady: false,
    };
  }
  async componentDidMount() {
    const response = await getProjects("");
    if (response) this.setState({ projects: response, isReady: true });
  }
  render() {
    const { isReady, projects } = this.state;
    if (!isReady) {
      return <SpinnerCenter />;
    }
    return (
      <>
      <div className="pt-1">
        <nav aria-label="breadcrumb">
          <ol class="breadcrumb ol-bread">
            <li className="breadcrumb-item">
              <i href="/home" className="bi bi-house-door-fill m-2" />
              <a href="/home">Inicio</a>
            </li>
            <li class="breadcrumb-item active" aria-current="page">
              Lista de tareas
            </li>
          </ol>
        </nav>
      </div>

        {isReady && !projects.length && (
          <ResultMessage message="No se encontraron proyectos." />
        )}
        {projects.map((project) => (
          <div>
            <h4 className="ml-3 pt-2">{project.name}</h4>
            <TaskSummary idProject={project.id} />
          </div>
        ))}
      </>
    );
  }
}

export default TaskSummaryContainer;
