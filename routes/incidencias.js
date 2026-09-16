const express = require("express");
const router = express.Router();

const { crearIncidencia, listarIncidencias, buscarIncidenciaPorId } = require("../controllers/incidenciasController");

router.post("/", crearIncidencia);
router.get("/", listarIncidencias);
router.get("/:id", buscarIncidenciaPorId);

module.exports = router;