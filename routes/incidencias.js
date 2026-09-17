const express = require("express");
const router = express.Router();

const { crearIncidencia, listarIncidencias, buscarIncidenciaPorId, cambiarEstado, clasificarIncidencia, eliminarIncidencia } = require("../controllers/incidenciasController");

router.post("/", crearIncidencia);
router.get("/", listarIncidencias);
router.get("/:id/clasificacion", clasificarIncidencia);
router.get("/:id", buscarIncidenciaPorId);
router.put("/:id/estado", cambiarEstado);
router.delete("/:id", eliminarIncidencia);

module.exports = router;