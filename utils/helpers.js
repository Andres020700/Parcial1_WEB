// Valores permitidos para la prioridad y el estado.
const PRIORIDADES_VALIDAS = ["Alta", "Media", "Baja"];
const ESTADOS = {
  PENDIENTE: "Pendiente",
  EN_PROCESO: "En Proceso",
  RESUELTA: "Resuelta",
  CANCELADA: "Cancelada",
};

function esStringValido(valor) {
  // Solo acepta textos que no estén vacíos.
  if (typeof valor !== "string") return false;
  return valor.trim().length > 0;
}

function capitalizar(texto) {
  // Deja cada palabra con la primera letra en mayúscula.
  return texto
    .trim()
    .toLowerCase()
    .split(" ")
    .filter((palabra) => palabra.length > 0)
    .map((palabra) => palabra.charAt(0).toUpperCase() + palabra.slice(1))
    .join(" ");
}

function validarIncidencia(body) {
  const { empleado, area, descripcion, prioridad } = body;

  // Revisa los campos obligatorios uno por uno.
  if (!esStringValido(empleado)) {
    return { valido: false, mensaje: "El campo 'empleado' es obligatorio y no puede estar vacio." };
  } else if (!esStringValido(area)) {
    return { valido: false, mensaje: "El campo 'area' es obligatorio y no puede estar vacio." };
  } else if (!esStringValido(descripcion)) {
    return { valido: false, mensaje: "El campo 'descripcion' es obligatorio y no puede estar vacio." };
  } else if (!esStringValido(prioridad)) {
    return { valido: false, mensaje: "El campo 'prioridad' es obligatorio y no puede estar vacio." };
  } else if (!PRIORIDADES_VALIDAS.includes(capitalizar(prioridad))) {
    return { valido: false, mensaje: "La prioridad debe ser: Alta, Media o Baja." };
  }

  return { valido: true, mensaje: "" };
}

function normalizarEstado(estado) {
  // Evita procesar valores que no sean texto.
  if (typeof estado !== "string") {
    return null;
  }

  const estadoNormalizado = estado
    .trim()
    .toLowerCase()
    .replace(/\s+/g, "");

  // Devuelve el estado con el formato usado por la aplicación.
  switch (estadoNormalizado) {
    case "pendiente":
      return ESTADOS.PENDIENTE;

    case "enproceso":
      return ESTADOS.EN_PROCESO;

    case "resuelta":
      return ESTADOS.RESUELTA;

    case "cancelada":
      return ESTADOS.CANCELADA;

    default:
      return null;
  }
}

// Exporta las funciones que usan los controladores.
module.exports = { PRIORIDADES_VALIDAS, esStringValido, validarIncidencia, capitalizar, normalizarEstado };