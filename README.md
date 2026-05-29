# Entregable Final - Backend III

## Estructura del proyecto

## Descripcion de la estructura del repositorio

Este repositorio contiene una API en Node.js con Express para el modulo de adopciones, junto con tests funcionales, persistencia MongoDB, Dockerizacion optimizada, documentacion Swagger y CI.

## Arbol de directorios

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

## Proposito de archivos y carpetas principales

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

## Tests funcionales

Se encuentra en:
- `test/functional/adoption.router.test.js`

Incluye cobertura para:
- `GET /api/adoptions` (200 y 500)
- `GET /api/adoptions/:id` (200 y 404)
- `POST /api/adoptions` (201 y 400)
- `PUT /api/adoptions/:id` (200, 404 y 400)
- `DELETE /api/adoptions/:id` (200 y 404)

## Decisiones de optimizacion

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

Para Render se usa `MONGODB_URI` remoto y `MONGODB_DB_NAME`.

### Log de construccion de imagen Docker

Comando ejecutado:

```bash
docker build -t final-backend-iii:1.0.0 .
```

## Imagen Docker

### Nombre y tag de imagen

- `final-backend-iii:1.0.0`

### Evidencia build y ejecucion

```bash
docker run -d --name final-backend-iii -p 3000:3000 final-backend-iii:1.0.0
docker logs final-backend-iii
```

## Ejecucion del proyecto

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

## URLs de entrega

- URL repositorio completo: `https://github.com/Edxear`
- URL publica DockerHub: `https://hub.docker.com/r/edxear/final-backend-iii`
- URL despliegue Render: `https://backend-iii-xfkr.onrender.com`
