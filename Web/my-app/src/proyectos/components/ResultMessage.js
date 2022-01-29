import React from "react";

const ResultMessage = ({ message }) => (
  <div class="alert alert-danger centrada-borde mb-1" role="alert">
    {message}
  </div>
);

export default ResultMessage;
