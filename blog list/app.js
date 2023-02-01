// const http = require("http");
const config = require("./utils/config");
const express = require("express");
require("express-async-errors");
const app = express();
const cors = require("cors");
const mongoose = require("mongoose");
const blogRouter = require("./controllers/blog");
const dbRouter = require("./controllers/database");
const userRouter = require("./controllers/user");
const loginRoutser = require("./controllers/login");
const middleware = require("./utils/middleware");
const logger = require("./utils/logger");
const databaseInit = require("./utils/database_init");

logger.info("connecting to", config.MONGO_DB_URL);

mongoose
  .connect(config.MONGO_DB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true,
  })
  .then(() => {
    logger.info("connected to MongoDB");
    if (process.env.NODE_ENV === "test") {
      databaseInit();
    }
  })
  .catch((error) => {
    logger.error("error connection to MongoDB:", error.message);
  });

app.use(cors());
app.use(express.json());
app.use(middleware.tokenExtractor);
app.use(middleware.requestLogger);

app.use("/api/blogs", blogRouter);
app.use("/api/db", dbRouter);
app.use("/api/users", userRouter);
app.use("/api/login", loginRoutser);

app.use(middleware.responseLogger);
app.use(middleware.errorHandler);

module.exports = app;
