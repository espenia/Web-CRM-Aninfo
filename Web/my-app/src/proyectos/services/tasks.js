import axios from "axios";

const URLBase = "https://project-squad5.herokuapp.com/api/";
//const URLBase = "http://127.0.0.1:8000/api/";

export async function getTasks(idProject, q) {
  let response = await axios
    .get(`${URLBase}projects/${idProject}/tasks/?q=${q}`)
    .catch((error) => {
      window.alert("Se produjo un error al obtener las tareas: " + error);
      window.location.href = "/proyectos/";
    });
  let data = response.data;
  data.sort(function (a, b) {
    return b.task_id - a.task_id;
  });
  return data;
}

export async function getTaskById(idProject, idTask) {
  let response = await axios
    .get(`${URLBase}projects/${idProject}/tasks/${idTask}`)
    .catch((error) => {
      window.alert("Se produjo un error al obtener la tarea: " + error);
      window.location.href = "/proyectos/";
    });
  let data = response.data;
  return data;
}

export async function deleteTaskById(idProject, idTask) {
  await axios
    .delete(`${URLBase}projects/${idProject}/tasks/${idTask}`)
    .catch((error) => {
      window.alert(
        "Se produjo un error al intentar eliminar la tarea. Puede que el elemento no exista." +
          error
      );
      window.location.href = "/proyectos/";
    });
}

export async function createTask(idProject, data) {
  let response = await axios
    .post(`${URLBase}projects/${idProject}/tasks/`, data)
    .catch((error) => {
      window.alert("Se produjo un error al crear la tarea: " + error);
      window.location.href = "/proyectos/";
    });
  return response.data;
}

export async function editTask(idProject, idTask, data) {
  await axios
    .put(`${URLBase}projects/${idProject}/tasks/${idTask}/`, data)
    .catch((error) => {
      window.alert("Se produjo un error al editar la tarea: " + error);
      window.location.href = "/proyectos/" + idProject;
    });
}
