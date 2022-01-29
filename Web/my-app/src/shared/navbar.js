import React from "react";

import { Navbar, Nav, NavDropdown } from "react-bootstrap";
import "./navbar.css";

export default function NavigationBar() {
  return (
    <div className="fixed-top">
      <Navbar bg="color_custom_nav" variant="dark" expand="lg">
        <Navbar.Brand className="mx-3" href="/home">
          PSA
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="mr-auto">
            <Nav.Link href="/soporte/productos" className="mx-3">
              Soporte
            </Nav.Link>
            <NavDropdown
              className="mx-3"
              title="Proyectos"
              id="basic-nav-dropdown"
            >
              <NavDropdown.Item href="/proyectos/proyecto/nuevo">
                Crear Proyecto
              </NavDropdown.Item>
              <NavDropdown.Item href="/tareas/crear/inicio">
                Crear Tarea
              </NavDropdown.Item>
              <NavDropdown.Item href="/proyectos">
                Ver Proyectos
              </NavDropdown.Item>
              <NavDropdown.Item href="/tareas/">Ver Tareas</NavDropdown.Item>
            </NavDropdown>
            <NavDropdown
              className="mx-3"
              title="Recursos"
              id="basic-nav-dropdown"
            >
              <NavDropdown.Item href="/recursos">
                Visualizar Recursos
              </NavDropdown.Item>
              <NavDropdown.Item href="/recursos/horas">
                Carga de horas
              </NavDropdown.Item>
            </NavDropdown>
          </Nav>
          <Nav>
            <Navbar.Text id="user-logged" className="justify-content-end">
              {/*<img src="/logo192.png" width="30"></img>*/}
              <p>Fernando Soluzzia  <span className="logged-in">●</span>    <img src="/logo192.png" width="30"></img></p>
            </Navbar.Text>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    </div>
  );
}
