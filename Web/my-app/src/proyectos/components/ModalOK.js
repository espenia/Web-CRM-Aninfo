import React from "react";
import { Modal } from "react-bootstrap";
import "./static/modalMessage.css";
import success from "./static/ok.png";

const ModalOK = ({ show, message }) => (
  <Modal show={show}>
    <div class="thank-you-pop">
      <img src={success} alt="" />
      <h3>{message}</h3>
    </div>
  </Modal>
);

export default ModalOK;
