const { validarIncidencia, capitalizar, normalizarEstado } = require("../utils/helpers");

// Guarda las incidencias mientras el servidor está encendido.
const incidencias = [];
let siguienteId = 1;

function crearIncidencia(req, res) {
  const { empleado, area, descripcion, prioridad } = req.body;

  // Revisa que los datos recibidos sean correctos.
  const resultado = validarIncidencia(req.body);

  if (!resultado.valido) {
    return res.status(400).json({ mensaje: resultado.mensaje });
  }

  const nuevaIncidencia = {
    id: siguienteId,
    empleado: empleado.trim(),
    area: area.trim(),
    descripcion: descripcion.trim(),
    prioridad: capitalizar(prioridad),
    estado: "Pendiente",
  };

  // Guarda la incidencia y prepara el siguiente id.
  incidencias.push(nuevaIncidencia);
  siguienteId++;

  return res.status(201).json({ mensaje: "Incidencia registrada correctamente." });
}

function listarIncidencias(_req, res) {
  // Devuelve todas las incidencias guardadas.
  return res.status(200).json(incidencias);
}

function buscarIncidenciaPorId(req, res) {
  const { id } = req.params;

  // Busca una incidencia usando el id recibido en la URL.
  const incidencia = incidencias.find((incidencia) => incidencia.id === parseInt(id));

  if (!incidencia) {
    return res.status(404).json({ mensaje: "Incidencia no encontrada" });
  }

  return res.status(200).json(incidencia);
}

function clasificarIncidencia(req, res) {
  const { id } = req.params;

  // Primero busca la incidencia que se quiere clasificar.
  const incidencia = incidencias.find((incidencia) => incidencia.id === parseInt(id));

  if (!incidencia) {
    return res.status(404).json({ mensaje: "Incidencia no encontrada" });
  }

  let clasificacion;

  // Convierte la prioridad en una clasificación más descriptiva.
  switch (incidencia.prioridad) {
    case "Alta":
      clasificacion = "Critica";
      break;
    case "Media":
      clasificacion = "Importante";
      break;
    case "Baja":
      clasificacion = "Normal";
      break;
    default:
      return res.status(400).json({ mensaje: "Prioridad invalida" });
  }

  return res.status(200).json({ id: incidencia.id, clasificacion });
}

function cambiarEstado(req, res) {
  const { id } = req.params;
  const { estado } = req.body;

  // Busca la incidencia que se va a actualizar.
  const incidencia = incidencias.find(
    (incidencia) => incidencia.id === parseInt(id)
  );

  if (!incidencia) {
    return res.status(404).json({
      mensaje: "Incidencia no encontrada"
    });
  }

  // Comprueba que el nuevo estado sea válido.
  const estadoValido = normalizarEstado(estado);

  if (!estadoValido) {
    return res.status(400).json({
      mensaje: "El estado debe ser Pendiente, En Proceso, Resuelta o Cancelada"
    });
  }

  incidencia.estado = estadoValido;

  return res.status(200).json({
    mensaje: "Estado actualizado correctamente",
    incidencia
  });
}

function eliminarIncidencia(req, res) {
  const { id } = req.params;

  // Busca la posición de la incidencia dentro del arreglo.
  const indice = incidencias.findIndex(
    (incidencia) => incidencia.id === parseInt(id)
  );

  if (indice === -1) {
    return res.status(404).json({
      mensaje: "Incidencia no encontrada"
    });
  }

  // Elimina la incidencia encontrada.
  incidencias.splice(indice, 1);

  return res.status(200).json({
    mensaje: "Incidencia eliminada correctamente",
  });

}

function obtenerEstadisticas(req, res) {
  // Cuenta cuántas incidencias hay en cada estado.
  const contarPorEstado = (estado) =>
    incidencias.filter((inc) => inc.estado === estado).length;

  // Prepara el resumen que se enviará al cliente.
  const respuesta = {
    totalIncidencias: incidencias.length,
    pendientes: contarPorEstado("Pendiente"),
    enProceso: contarPorEstado("En Proceso"),
    resueltas: contarPorEstado("Resuelta"),
    canceladas: contarPorEstado("Cancelada"),
  };

  return res.status(200).json(respuesta);
}

// Exporta las funciones para usarlas en las rutas.
module.exports = {
  incidencias,
  crearIncidencia,
  listarIncidencias,
  buscarIncidenciaPorId,
  cambiarEstado,
  clasificarIncidencia,
  eliminarIncidencia,
  obtenerEstadisticas
};