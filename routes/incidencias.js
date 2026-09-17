const express = require("express");
const router = express.Router();

const { crearIncidencia, listarIncidencias, buscarIncidenciaPorId, cambiarEstado } = require("../controllers/incidenciasController");

router.post("/", crearIncidencia);
router.get("/", listarIncidencias);
router.get("/:id", buscarIncidenciaPorId);
router.put("/:id/estado", cambiarEstado);

module.exports = router;