const express = require("express");
const incidenciasRouter = require("./routes/incidencias");
const { obtenerEstadisticas } = require("./controllers/incidenciasController");

// Crea la aplicación y define el puerto donde escuchará.
const app = express();
const PORT = 3000;

// Permite recibir datos en formato JSON.
app.use(express.json());

// Agrupa todas las rutas de incidencias bajo /incidencias.
app.use("/incidencias", incidenciasRouter);

// Ruta principal de la API.
app.get("/", (req, res) => {
  res.json({ mensaje: "API de Incidencias - TechSupport S.A." });
});

// Devuelve el resumen de las incidencias.
app.get("/estadisticas", obtenerEstadisticas);

// Responde cuando la ruta solicitada no existe.
app.use((req, res) => {
  res.status(404).json({ mensaje: "Ruta no encontrada" });
});

// Inicia el servidor.
app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});