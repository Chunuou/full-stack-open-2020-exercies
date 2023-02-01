const dbRouter = require("express").Router();
const databaseInit = require("../utils/database_init");

dbRouter.delete("/reset", (request, response) => {
  databaseInit();

  response.end();
});

module.exports = dbRouter;
