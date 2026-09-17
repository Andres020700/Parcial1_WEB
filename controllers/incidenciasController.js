const { validarIncidencia, capitalizar, normalizarEstado } = require("../utils/helpers");

const incidencias = [];
let siguienteId = 1;

function crearIncidencia(req, res) {
  const { empleado, area, descripcion, prioridad } = req.body;

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

  incidencias.push(nuevaIncidencia);
  siguienteId++;

  return res.status(201).json({ mensaje: "Incidencia registrada correctamente." });
}

function listarIncidencias(_req, res) {
  return res.status(200).json(incidencias);
}

function buscarIncidenciaPorId(req, res) {
  const { id } = req.params;

  const incidencia = incidencias.find((incidencia) => incidencia.id === parseInt(id));

  if (!incidencia) {
    return res.status(404).json({ mensaje: "Incidencia no encontrada" });
  }

  return res.status(200).json(incidencia);
}

function clasificarIncidencia(req, res) {
  const { id } = req.params;

  const incidencia = incidencias.find((incidencia) => incidencia.id === parseInt(id));

  if (!incidencia) {
    return res.status(404).json({ mensaje: "Incidencia no encontrada" });
  }

  let clasificacion;

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


  const incidencia = incidencias.find(
    (incidencia) => incidencia.id === parseInt(id)
  );

  if (!incidencia) {
    return res.status(404).json({
      mensaje: "Incidencia no encontrada"
    });
  }

  const estadoValido = normalizarEstado(estado);

  if (!estadoValido) {
    return res.status(400).json({
      mensaje: "El estado debe ser Pendiente, En progreso, Resuelta o Cancelada"
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

  const indice = incidencias.findIndex(
    (incidencia) => incidencia.id === parseInt(id)
  );

  if (indice === -1) {
    return res.status(404).json({
      mensaje: "Incidencia no encontrada"
    });
  }

  incidencias.splice(indice, 1);

  return res.status(200).json({
    mensaje: "Incidencia eliminada correctamente",
  });

}

function obtenerEstadisticas(req, res) {
  const contarPorEstado = (estado) =>
    incidencias.filter((inc) => inc.estado === estado).length;

  const respuesta = {
    totalIncidencias: incidencias.length,
    pendientes: contarPorEstado("Pendiente"),
    enProceso: contarPorEstado("En Proceso"),
    resueltas: contarPorEstado("Resuelta"),
    canceladas: contarPorEstado("Cancelada"),
  };

  return res.status(200).json(respuesta);
}


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