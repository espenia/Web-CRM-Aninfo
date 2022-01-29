export function readableStatus(stateStr) {
  switch (stateStr) {
    case "CREADA":
      return "Creada";
    case "ASIGNADA":
      return "Asignada";
    case "COMPLETADA":
      return "Completada";
    case "ENPROGRESO":
      return "En progreso";
    case "BLOQUEADA":
      return "Bloqueada";
    case "ENESPERA":
      return "En espera";
    case "INICIADO":
      return "Iniciado";
    case "ENTRANSICION":
      return "En transición";
    case "COMPLETADO":
      return "Completado";
    default:
      return "--";
  }
}
export function readablePriority(priorityStr) {
  switch (priorityStr) {
    case "BAJA":
      return "Baja";
    case "MEDIA":
      return "Media";
    case "ALTA":
      return "Alta";
    default:
      return "--";
  }
}
export function replaceIfEmpty(s) {
  if (s) return s;
  return "--";
}
export function capitalize(s) {
  return s.toLowerCase().replace(/\b./g, function (a) {
    return a.toUpperCase();
  });
}
