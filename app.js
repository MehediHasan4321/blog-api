const express = require("express");
require("dotenv").config();
const swaggerUI = require("swagger-ui-express");
const YAML = require("yamljs");

const swaggerDoc = YAML.load("./swagger.yaml");
const openapivalidator = require("express-openapi-validator");
const mongoose = require("mongoose");

const app = express();




app.use(express.json());

app.use("/docs", swaggerUI.serve, swaggerUI.setup(swaggerDoc));

app.use(openapivalidator.middleware({ apiSpec: "./swagger.yaml" }));





app.use((req, _res, next) => {
  req.user = {
    id: 999,
    name: "Mehedi Hasan",
  };
  next();
});



app.use((err, _req, res, _next) => {
  //TODO: Format Error;

  res.status(err.status || 500).json({
    message: err.message,
    error: err.error,
  });
});

app.get("/health", (_req, res) => {
  res.status(200).json({ health: "Success" });
});

let dbConnectionUrl = process.env.DB_CONNECTION_URL;

dbConnectionUrl = dbConnectionUrl.replace(
  "<username>",
  process.env.DB_USERNAME
);
dbConnectionUrl = dbConnectionUrl.replace(
  "<password>",
  process.env.DB_PASSWORD
);

dbConnectionUrl = `${dbConnectionUrl}/${process.env.DB_NAME}?${process.env.DB_URL_QUERY}`

mongoose.connect(dbConnectionUrl,).then(() => {
  console.log("Database connected");
  const PORT = process.env.PORT || 4000;
  app.listen(PORT, async() => {
    console.log(`server is running on port ${PORT}`);
  });
}).catch(e=>{
    console.log('Database connection failed');
    console.log('Message:',e.message);
})
