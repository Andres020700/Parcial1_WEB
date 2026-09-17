const express = require("express");
const incidenciasRouter = require("./routes/incidencias");
const { obtenerEstadisticas } = require("./controllers/incidenciasController");

const app = express();
const PORT = 3000;

// Middleware: convierte el body JSON en req.body
app.use(express.json());

// Rutas de incidencias
app.use("/incidencias", incidenciasRouter);

// Ruta raiz informativa
app.get("/", (req, res) => {
  res.json({ mensaje: "API de Incidencias - TechSupport S.A." });
});

app.get("/estadisticas", obtenerEstadisticas);

// 404: siempre al final
app.use((req, res) => {
  res.status(404).json({ mensaje: "Ruta no encontrada" });
});

app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});