const express = require("express");
const swaggerUi = require("swagger-ui-express");
const swaggerJSDoc = require("swagger-jsdoc");
const adoptionRouter = require("./routes/adoption.router");

const app = express();

app.use(express.json());

const swaggerDefinition = {
  openapi: "3.0.0",
  info: {
    title: "Final Backend III API",
    version: "1.0.0",
    description: "API de ejemplo para entregable final"
  }
};

const swaggerOptions = {
  swaggerDefinition,
  apis: ["./src/routes/*.js"]
};

const swaggerSpec = swaggerJSDoc(swaggerOptions);

app.use("/api/docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));
app.use("/api/adoptions", adoptionRouter);

app.get("/health", (_req, res) => {
  res.status(200).json({ status: "ok" });
});

module.exports = app;
