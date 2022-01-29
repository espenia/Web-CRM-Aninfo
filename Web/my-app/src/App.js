import "./App.css";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";

import "bootstrap/dist/css/bootstrap.min.css";

import Home from "./Home";
import Resources from "./recursos/Resources";
import ProjectRoute from "./proyectos/services/routers";
import Support from "./soporte/Support";
import SupportTicketGrid from "./soporte/SupportTicketGrid";
import TicketDetails from "./soporte/TicketDetails";
import TicketCreation from "./soporte/TicketCreation";
import CargaDeHoras from "./recursos/CargaDeHoras";
import FormCargaDeHoras from "./recursos/FormCargaHoras";
import FormEditHoras from "./recursos/FormEditHoras";
import NavigationBar from "./shared/navbar";

function App() {
  return (
    <Router>
      <div>
        <NavigationBar />
        <br />
        <br />
        <br />
        <Switch>
          <Route exact path="/">
            <Redirect to="/home" />
          </Route>
          <Route exact path="/home">
            <Home />
          </Route>
          <Route exact path="/recursos">
            <Resources />
          </Route>
          <Route exact path="/recursos/horas">
            <CargaDeHoras />
          </Route>
          <Route exact path="/recursos/horas/cargar">
            <FormCargaDeHoras />
          </Route>
          <Route exact path="/recursos/horas/editar/:id">
            <FormEditHoras />
          </Route>
          <Route exact path="/soporte/productos">
            <Support />
          </Route>
          <Route exact path="/soporte/productos/:idProducto">
            <SupportTicketGrid />
          </Route>
          <Route exact path="/soporte/tickets/create/:idProducto">
            <TicketCreation />
          </Route>
          <Route exact path="/soporte/tickets/:idTicket/:idTarea">
            <TicketDetails />
          </Route>
          <Route exact path="/soporte/tickets/:idTicket">
            <TicketDetails />
          </Route>
          <ProjectRoute />
        </Switch>
      </div>
    </Router>
  );
}

export default App;
