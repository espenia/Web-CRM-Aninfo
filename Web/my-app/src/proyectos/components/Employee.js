import React from "react";
import { getEmployeeById } from "../services/employees";
class Employee extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      idEmployee: this.props.idEmployee,
      isReady: false,
      name: "",
      surname: "",
    };
  }
  async componentDidMount() {
    if (this.state.idEmployee) {
      let response = await getEmployeeById(this.state.idEmployee);
      this.setState({
        name: response.nombre,
        surname: response.apellido,
        isReady: true,
      });
    }
  }

  render() {
    const { isReady, name, surname } = this.state;
    if (!isReady) {
      return "...";
    }
    return <>{surname + ", " + name}</>;
  }
}

export default Employee;
