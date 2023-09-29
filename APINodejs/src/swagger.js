const  swaggerJSDoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");
const path = require('path');

// Basic Meta Informations about our API
const options = {
  definition: {
    openapi: "3.0.0",
    info: { title: "ComuAPI",
    description: "Una api creada para conseguir información de jugadores de futbol",
     version: "1.0.0" },
  },
  tags:[
    {
      name: "Jugadores",
      description: "Operaciones relacionadas con jugadores",
    },
    {
      name: "Historial Jugadores",
      description: "Operaciones relacionadas con el historial de los jugadores"
    },
    {
      name:"Gestion de jugadores",
      description: "Añadir un nuevo jugador"
    }
  ],
  apis: [
    path.join(__dirname, 'app.js'),
    path.join(__dirname, 'routes', 'player_routes.js'),
    path.join(__dirname, 'routes', 'historial_routes.js'),
    path.join(__dirname, 'routes', 'update_routes.js')
  ],
};

// Docs in JSON format
const swaggerSpec = swaggerJSDoc(options);

// Function to setup our docs
const swaggerDocs = (app, port) => {
  // Route-Handler to visit our docs
  app.use("/api/v1/docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));
  // Make our docs in JSON format available
  app.get("/api/v1/docs.json", (req, res) => {
    res.setHeader("Content-Type", "application/json");
    res.send(swaggerSpec);
  });
  console.log(
    `Version 1 Docs are available on http://10.228.64.253:${port}/api/v1/docs`
    );
  };
  
  module.exports = { swaggerDocs };