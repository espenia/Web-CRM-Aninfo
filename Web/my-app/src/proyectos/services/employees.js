import axios from "axios";

const URLBase = "https://psa-recursos.herokuapp.com/";

export async function getEmployees() {
  let response = await axios.get(`${URLBase}recursos`);
  let data = response.data;
  return data;
}

export async function getEmployeeById(idEmployee) {
  let response = await axios.get(`${URLBase}recursos/${idEmployee}`);
  let data = response.data;
  return data;
}
