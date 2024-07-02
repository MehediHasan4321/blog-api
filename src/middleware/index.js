const express = require("express");
const swaggerUI = require("swagger-ui-express");
const YAML = require("yamljs");
const openapivalidator = require("express-openapi-validator");
const swaggerDoc = YAML.load("./swagger.yaml");
const morgan = require('morgan')






const applyMiddleware = (app) => {
    

  app.use(express.json());

  app.use("/docs", swaggerUI.serve, swaggerUI.setup(swaggerDoc));

  app.use(openapivalidator.middleware({ apiSpec: "./swagger.yaml" }));
  app.use(morgan('dev'))
  

};

module.exports = applyMiddleware;
