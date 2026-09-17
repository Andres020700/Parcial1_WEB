const express = require("express");
const router = express.Router();

// Importa las funciones que atienden cada petición.
const { crearIncidencia, listarIncidencias, buscarIncidenciaPorId, cambiarEstado, clasificarIncidencia, eliminarIncidencia } = require("../controllers/incidenciasController");

// Crea una incidencia.
router.post("/", crearIncidencia);

// Lista todas las incidencias.
router.get("/", listarIncidencias);

// Clasifica una incidencia por su id.
router.get("/:id/clasificacion", clasificarIncidencia);

// Busca una incidencia por su id.
router.get("/:id", buscarIncidenciaPorId);

// Cambia el estado de una incidencia.
router.put("/:id/estado", cambiarEstado);

// Elimina una incidencia.
router.delete("/:id", eliminarIncidencia);

// Permite usar este archivo desde app.js.
module.exports = router;