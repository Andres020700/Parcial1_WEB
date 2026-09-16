const { validarIncidencia, capitalizar } = require("../utils/helpers");

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

function listarIncidencias(req, res)
{
  return res.status(200).json(incidencias);
}

function buscarIncidenciaPorId(req, res) {
  const {id} = req.params;

  const incidencia = incidencias.find((incidencia) => incidencia.id === parseInt(id));

  if (!incidencia) {
    return res.status(404).json({ mensaje: "Incidencia no encontrada" });
  }

  return res.status(200).json(incidencia);
}

function obtenerEstadisticas(req, res) {
  const estadisticas = {
    totalIncidencias: incidencias.length,
    pendientes: incidencias.filter((incidencia) => incidencia.estado === "Pendiente").length,
    enProceso: incidencias.filter((incidencia) => incidencia.estado === "En Proceso").length,
    resueltas: incidencias.filter((incidencia) => incidencia.estado === "Resuelta").length,
    canceladas: incidencias.filter((incidencia) => incidencia.estado === "Cancelada").length,
  };

  return res.status(200).json(estadisticas);
}


module.exports = {
  incidencias,
  crearIncidencia,
  listarIncidencias,
  buscarIncidenciaPorId,
  obtenerEstadisticas,
};