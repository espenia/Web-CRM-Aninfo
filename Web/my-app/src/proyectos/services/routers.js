import { Route } from "react-router-dom";
import ProjectEditContainer from "../components/ProjectEditContainer";
import ProjectCreateContainer from "../components/ProjectCreateContainer";
import TaskCreateContainer from "../components/TaskCreateContainer";
import TaskEditContainer from "../components/TaskEditContainer";
import TaskSummaryContainer from "../components/TaskSummaryContainer";
import ProjectDetailsContainer from "../components/ProjectDetailsContainer";
import ProjectsContainer from "../components/ProjectsContainer";

const ProjectRoute = () => {
  return (
    <>
      <Route exact path="/proyectos">
        <ProjectsContainer />
      </Route>
      <Route
        exact
        path="/proyectos/:idProject/"
        component={ProjectDetailsContainer}
      ></Route>

      <Route
        exact
        path="/proyectos/proyecto/nuevo"
        component={ProjectCreateContainer}
      ></Route>
      <Route
        exact
        path="/proyectos/:idProject/editar"
        component={ProjectEditContainer}
      ></Route>

      <Route
        exact
        path="/proyecto/:idProject/:idTask/:operation"
        component={TaskEditContainer}
      ></Route>
      <Route
        exact
        path="/proyectos/:idProject/tarea/:operation"
        component={TaskEditContainer}
      ></Route>
      <Route
        exact
        path="/tareas/:operation/:from/:idTicket"
        component={TaskCreateContainer}
      ></Route>
      <Route
        exact
        path="/tareas/:operation/:from/"
        component={TaskCreateContainer}
      ></Route>
      <Route exact path="/tareas/" component={TaskSummaryContainer}></Route>
    </>
  );
};

export default ProjectRoute;
