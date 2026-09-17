const express = require("express");
const router = express.Router();

const { crearIncidencia, listarIncidencias, buscarIncidenciaPorId, clasificarIncidencia } = require("../controllers/incidenciasController");

router.post("/", crearIncidencia);
router.get("/", listarIncidencias);
router.get("/:id/clasificacion", clasificarIncidencia);
router.get("/:id", buscarIncidenciaPorId);

module.exports = router;