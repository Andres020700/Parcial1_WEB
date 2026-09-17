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

function clasificarIncidencia(req, res) {
  const {id} = req.params;

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


module.exports = { 
  incidencias,
  crearIncidencia, 
  listarIncidencias,
  buscarIncidenciaPorId,
  clasificarIncidencia
};