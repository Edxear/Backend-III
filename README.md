# Final Backend III - Entregable final

Proyecto backend Node.js con:
- Tests funcionales completos para `adoption.router.js`
- Persistencia real en MongoDB
- Variables de entorno para local, Docker y Render
- Dockerfile optimizado + Docker Compose
- Documentacion Swagger/OpenAPI y CI

## 1) Estructura del proyecto

```text
Final Backend III/
├── .github/workflows/ci.yml
├── src/
│   ├── app.js
│   ├── server.js
│   ├── config/env.js
│   ├── controllers/adoption.controller.js
│   ├── db/mongo.js
│   ├── models/adoption.model.js
│   ├── repositories/adoption.repository.js
│   ├── routes/adoption.router.js
│   └── services/adoption.service.js
├── test/functional/adoption.router.test.js
├── .env.example
├── .env.render.example
├── .dockerignore
├── docker-compose.yml
├── Dockerfile
├── package.json
├── render.yaml
└── README.md
```

## 2) Variables de entorno

Crear `.env` a partir de `.env.example`:

```env
NODE_ENV=development
PORT=3000
MONGODB_URI=mongodb://localhost:27017/final_backend_iii
MONGODB_DB_NAME=final_backend_iii
```

Variables para Render en el panel o en `render.yaml`:
- `NODE_ENV=production`
- `PORT=3000`
- `MONGODB_URI=<tu string de conexion de Mongo Atlas o servicio gestionado>`
- `MONGODB_DB_NAME=final_backend_iii`

## 3) Endpoints cubiertos por tests funcionales

Base URL: `http://localhost:3000`

- `GET /api/adoptions`
- `GET /api/adoptions/:id`
- `POST /api/adoptions`
- `PUT /api/adoptions/:id`
- `DELETE /api/adoptions/:id`

Estrategia:
- Mocks/fakes con Jest para aislar servicio
- Casos de exito
- Casos de validacion (400)
- Casos de no encontrado (404)
- Errores internos (500)

## 4) Evidencia de ejecucion de tests

```bash
npm test
```

Salida esperada:

```text
PASS  test/functional/adoption.router.test.js
Tests:       11 passed, 11 total
```

## 5) MongoDB local (contenedor)

Levantar MongoDB solo:

```bash
docker compose up -d mongo
```

Levantar API + MongoDB:

```bash
docker compose up -d
```

Logs:

```bash
docker compose logs -f api
docker compose logs -f mongo
```

Seed de usuarios de prueba:

```bash
npm run seed:users
```

Usuarios cargados en MongoDB:
- admin.finalbackend@example.com (admin)
- lucia.tester@example.com (user)
- mateo.qa@example.com (user)

Verificacion directa en Mongo:

```bash
docker compose exec mongo mongosh --quiet --eval "db = db.getSiblingDB('final_backend_iii'); db.users.find({}, {_id:0, firstName:1, lastName:1, email:1, role:1}).toArray()"
```

## 6) Dockerizacion

Decisiones de optimizacion aplicadas:
- `node:20-alpine`
- Multi-stage build
- `npm ci --omit=dev`
- Usuario no root
- Copia minima de archivos necesarios

Build de imagen:

```bash
npm run docker:build
```

Run de imagen:

```bash
npm run docker:run
```

Escaneo basico:

```bash
npm run docker:scan
```

## 7) Publicacion en DockerHub

Ejemplo con usuario `edxear`:

```bash
docker login
docker tag final-backend-iii:1.0.0 edxear/final-backend-iii:1.0.0
docker push edxear/final-backend-iii:1.0.0
```

URL publica esperada:
- `https://hub.docker.com/r/edxear/final-backend-iii`

## 8) Deploy en Render

1. Subir repositorio a GitHub.
2. En Render crear servicio `Web Service` con `runtime: Docker` o usar `render.yaml`.
3. Configurar env vars:
   - `NODE_ENV`
   - `PORT`
   - `MONGODB_URI`
   - `MONGODB_DB_NAME`
4. Enlazar Mongo remoto (recomendado Mongo Atlas) en `MONGODB_URI`.
5. Verificar healthcheck en `/health`.

Nota: para completar deploy en Render se requiere inicio de sesion en dashboard. Si no hay sesion activa, abrir `https://dashboard.render.com` y autenticar antes de crear el servicio.

## 9) Documentacion API

Swagger UI:

```text
http://localhost:3000/api/docs
```

## 10) URLs de entrega

Completar antes de entregar:
- URL repositorio: `https://github.com/TU_USUARIO/TU_REPO`
- URL DockerHub: `https://hub.docker.com/r/edxear/final-backend-iii`
- URL Render: `https://<tu-servicio>.onrender.com`
