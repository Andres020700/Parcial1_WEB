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



module.exports = { incidencias, crearIncidencia, listarIncidencias };