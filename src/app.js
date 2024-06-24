const express = require("express");
const app = express();
const applyMiddleware = require('./middleware')





applyMiddleware(app)


app.use((err, _req, res, _next) => {
  //TODO: Format Error;

  res.status(err.status || 500).json({
    message: err.message,
    error: err.error,
  });
});

app.get("/health", (req, res) => {
  res.status(200).json(
    { 
      health: "Success",
      user:req.user
    }
  );
});




module.exports = app