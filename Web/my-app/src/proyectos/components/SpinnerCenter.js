import React from "react";
import { Spinner } from "react-bootstrap";
import "./static/projects.css";

const SpinnerCenter = () => (
  <div className="center-screen">
    <Spinner animation="grow" role="status" variant="info" />
    <span className="h5"> Cargando...</span>
    <br />
  </div>
);
export default SpinnerCenter;
