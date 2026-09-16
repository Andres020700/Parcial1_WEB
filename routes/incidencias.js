const express = require("express");
const router = express.Router();

const { crearIncidencia, listarIncidencias } = require("../controllers/incidenciasController");

router.post("/", crearIncidencia);
router.get("/", listarIncidencias);

module.exports = router;