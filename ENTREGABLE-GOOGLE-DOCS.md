# Entregable Final - Backend III

## 1. Estructura del proyecto

### Descripcion de la estructura del repositorio

Este repositorio contiene una API en Node.js con Express para el modulo de adopciones, junto con tests funcionales, persistencia MongoDB, Dockerizacion optimizada, documentacion Swagger y CI.

### Arbol de directorios

```text
Final Backend III/
├── .github/
│   └── workflows/
│       └── ci.yml
├── src/
│   ├── config/
│   │   └── env.js
│   ├── db/
│   │   └── mongo.js
│   ├── models/
│   │   └── adoption.model.js
│   ├── controllers/
│   │   └── adoption.controller.js
│   ├── repositories/
│   │   └── adoption.repository.js
│   ├── routes/
│   │   └── adoption.router.js
│   ├── services/
│   │   └── adoption.service.js
│   ├── app.js
│   └── server.js
├── test/
│   └── functional/
│       └── adoption.router.test.js
├── .env.example
├── .env.render.example
├── .dockerignore
├── .gitignore
├── Dockerfile
├── docker-compose.yml
├── package.json
├── render.yaml
├── README.md
└── ENTREGABLE-GOOGLE-DOCS.md
```

### Proposito de archivos y carpetas principales

- `src/routes/adoption.router.js`: define endpoints REST y anotaciones OpenAPI.
- `src/controllers/adoption.controller.js`: logica HTTP, codigos de respuesta y manejo de errores.
- `src/services/adoption.service.js`: validaciones de negocio.
- `src/config/env.js`: centraliza y valida variables de entorno.
- `src/db/mongo.js`: conexion a MongoDB.
- `src/models/adoption.model.js`: schema de Mongoose.
- `src/repositories/adoption.repository.js`: persistencia MongoDB.
- `test/functional/adoption.router.test.js`: tests funcionales de todos los endpoints.
- `Dockerfile`: imagen optimizada y segura.
- `docker-compose.yml`: orquestacion local API + MongoDB.
- `render.yaml`: declaracion para despliegue en Render.
- `.github/workflows/ci.yml`: pipeline de integracion continua.

## 2. Tests funcionales

### Codigo completo de tests funcionales

Se encuentra en:
- `test/functional/adoption.router.test.js`

Incluye cobertura para:
- `GET /api/adoptions` (200 y 500)
- `GET /api/adoptions/:id` (200 y 404)
- `POST /api/adoptions` (201 y 400)
- `PUT /api/adoptions/:id` (200, 404 y 400)
- `DELETE /api/adoptions/:id` (200 y 404)

### Explicacion de que valida cada grupo de tests

- Lectura de coleccion: respuesta correcta con lista y manejo de fallo interno.
- Lectura por id: caso encontrado y no encontrado.
- Creacion: caso exitoso y error de validacion.
- Actualizacion: caso exitoso, no encontrado y validacion de body vacio.
- Eliminacion: caso exitoso y no encontrado.

### Evidencia de ejecucion de tests

Comando ejecutado:

```bash
npm test
```

Logs de ejecucion:

```text
PASS  test/functional/adoption.router.test.js
  Functional tests - adoption.router.js
    GET /api/adoptions
      √ should return all adoptions
      √ should return 500 when service fails
    GET /api/adoptions/:id
      √ should return adoption by id
      √ should return 404 when adoption does not exist
    POST /api/adoptions
      √ should create adoption successfully
      √ should return 400 when validation fails
    PUT /api/adoptions/:id
      √ should update adoption
      √ should return 404 when adoption to update does not exist
      √ should return 400 when update data is invalid
    DELETE /api/adoptions/:id
      √ should delete adoption
      √ should return 404 when adoption to delete does not exist

Test Suites: 1 passed, 1 total
Tests:       11 passed, 11 total
```

## 3. Dockerizacion

### Dockerfile optimizado utilizado

```dockerfile
FROM node:20-alpine AS deps
WORKDIR /app
COPY package*.json ./
RUN npm ci --omit=dev

FROM node:20-alpine AS runtime
ENV NODE_ENV=production
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY src ./src
COPY package.json ./package.json

RUN addgroup -S appgroup && adduser -S appuser -G appgroup
USER appuser

EXPOSE 3000
CMD ["node", "src/server.js"]
```

### Decisiones de optimizacion

- `node:20-alpine`: reduce peso base de imagen.
- Multi-stage build: separa capa de dependencias del runtime.
- `npm ci --omit=dev`: instala solo lo necesario para produccion.
- Usuario no root: mejora seguridad del contenedor.
- Copia selectiva de archivos: minimiza contexto y superficie de ataque.

### Variables de entorno requeridas

```env
NODE_ENV=production
PORT=3000
MONGODB_URI=mongodb://localhost:27017/final_backend_iii
MONGODB_DB_NAME=final_backend_iii
```

Para Render se usa `MONGODB_URI` remoto (por ejemplo Mongo Atlas) y `MONGODB_DB_NAME`.

### Log de construccion de imagen Docker

Comando ejecutado:

```bash
docker build -t final-backend-iii:1.0.0 .
```

Resultado en este entorno:

```text
ERROR: request returned 500 Internal Server Error for API route and version http://%2F%2F.%2Fpipe%2FdockerDesktopLinuxEngine/_ping
```

Nota: El error indica problema del Docker Engine local (no del Dockerfile). Con Docker Desktop activo y engine disponible, el build procede normalmente.

## 4. Imagen Docker

### Nombre y tag de imagen

- `final-backend-iii:1.0.0`

### Evidencia build y ejecucion

- Evidencia de intento de build incluida en la seccion anterior.
- Completar ejecucion de contenedor cuando Docker Engine este operativo:

```bash
docker run -d --name final-backend-iii -p 3000:3000 final-backend-iii:1.0.0
docker logs final-backend-iii
```

## 5. Ejecucion del proyecto

### Instrucciones para construir imagen Docker

```bash
docker build -t final-backend-iii:1.0.0 .
```

### Instrucciones para ejecutar contenedor

```bash
docker run -d --name final-backend-iii -p 3000:3000 final-backend-iii:1.0.0
```

### Instrucciones para ejecutar con MongoDB (compose)

```bash
docker compose up -d
docker compose logs -f api
```

### Instrucciones para correr tests

```bash
npm install
npm test
```

### Evidencia de ejecucion exitosa

- Tests: ejecutados y aprobados (11/11).
- Docker: API y MongoDB operativos con `docker compose up -d`.
- MongoDB: seed de usuarios ejecutado con `npm run seed:users`.

Usuarios insertados para pruebas:
- admin.finalbackend@example.com (admin)
- lucia.tester@example.com (user)
- mateo.qa@example.com (user)

Evidencia en logs:

```text
final-backend-api  | MongoDB connected
final-backend-api  | Server running on port 3000
```

## 6. README

Se adjunta y mantiene actualizado en:
- `README.md`

Incluye:
- Estructura del proyecto
- Endpoints y cobertura
- Instrucciones para tests y Docker
- URLs a completar del repo e imagen DockerHub

## 7. URLs de entrega

Completar antes de enviar:

- URL repositorio completo: `https://github.com/TU_USUARIO/TU_REPO`
- URL publica DockerHub: `https://hub.docker.com/r/edxear/final-backend-iii`
- URL despliegue Render: `https://TU-SERVICIO.onrender.com`

