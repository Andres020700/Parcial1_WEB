const express = require("express");
const router = express.Router();

const { crearIncidencia } = require("../controllers/incidenciasController");

router.post("/", crearIncidencia);

module.exports = router;