const PRIORIDADES_VALIDAS = ["Alta", "Media", "Baja"];

function esStringValido(valor) {
  if (typeof valor !== "string") return false;
  return valor.trim().length > 0;
}

function capitalizar(texto) {
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

module.exports = { PRIORIDADES_VALIDAS, esStringValido, validarIncidencia, capitalizar };