# API de Incidencias

API REST con Node.js y Express para registrar y administrar incidencias técnicas. No usa base de datos, todo se guarda en memoria en un arreglo.

## Cómo correrlo

```bash
npm install
npm start
```

o en modo desarrollo (se reinicia solo al guardar cambios):

```bash
npm install nodemon --save-dev
npm run dev
```

Por defecto corre en `http://localhost:3000`.

## Cómo funciona

El proyecto está dividido en tres capas:

- **routes/incidencias.js** define las URLs y qué función se ejecuta en cada una.
- **controllers/incidenciasController.js** tiene la lógica de cada endpoint (validar, buscar, modificar el arreglo, responder).
- **utils/helpers.js** tiene funciones reutilizables de validación (campos vacíos, prioridad válida, normalizar estado).

Cada incidencia se guarda con esta forma:

```json
{
  "id": 1,
  "empleado": "Juan Perez",
  "area": "Contabilidad",
  "descripcion": "No puedo imprimir documentos",
  "prioridad": "Alta",
  "estado": "Pendiente"
}
```

## Endpoints

- `POST /incidencias` - crea una incidencia. Valida que los campos no vengan vacíos y que la prioridad sea Alta/Media/Baja.
- `GET /incidencias` - lista todas las incidencias.
- `GET /incidencias/:id` - busca una por id.
- `GET /incidencias/:id/clasificacion` - devuelve la clasificación según prioridad (Alta→Crítica, Media→Importante, Baja→Normal), usando switch.
- `PUT /incidencias/:id/estado` - cambia el estado (Pendiente, En Proceso, Resuelta, Cancelada), usando switch.
- `DELETE /incidencias/:id` - elimina una incidencia.
- `GET /estadisticas` - devuelve el total de incidencias y cuántas hay por cada estado (pendientes, en proceso, resueltas, canceladas), calculado con `filter()`.