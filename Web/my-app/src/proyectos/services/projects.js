import axios from "axios";
const URLBase = "https://project-squad5.herokuapp.com/api/";
//const URLBase = "http://127.0.0.1:8000/api/";

export async function getProjects(q) {
  let response = await axios
    .get(`${URLBase}projects/?q=${q}`)
    .catch((error) => {
      window.alert("Se produjo un error al obtener los proyectos. " + error);
      window.location.href = "/proyectos/";
    });
  let data = response.data.data;
  data.sort(function (a, b) {
    return b.id - a.id;
  });
  return data;
}

export async function getProjectById(id) {
  let response = await axios.get(`${URLBase}projects/${id}`).catch((error) => {
    window.alert("Se produjo un error al obtener el proyecto. " + error);
    window.location.href = "/proyectos/";
  });
  let data = response.data.data;
  return data;
}

export async function deleteProjecyById(idProject) {
  await axios.delete(`${URLBase}projects/${idProject}/`).catch((error) => {
    window.alert("Se produjo un error al editar el proyecto. " + error);
    window.location.href = "/proyectos/";
  });
}

export async function createProject(data) {
  let response = await axios
    .post(`${URLBase}projects/`, data)
    .catch((error) => {
      window.alert("Se produjo un error al crear el proyecto. " + error);
      window.location.href = "/proyectos/proyecto/nuevo";
    });
  return response.data;
}

export async function editProject(idProject, data) {
  await axios.put(`${URLBase}projects/${idProject}/`, data).catch((error) => {
    window.alert("Se produjo un error al editar el proyecto. " + error);
    window.location.href = "/proyectos/";
  });
}
