const mongoose = require("mongoose");
const express = require("express");
const cors = require("cors");
const app = express();

const logger = require("./utils/logger");
const config = require("./utils/config");
const middleware = require("./utils/middleware");
const blogRouter = require("./controller/blogs");
const usersRouter = require("./controller/users");
const loginRouter = require("./controller/login");

logger.info("connecting to MongoDB");

mongoose
  .connect(config.MONGODB_URL)
  .then(() => logger.info("connected to MongoDB."))
  .catch((error) => logger.error("error connecting to MongoDB", error.message));

app.use(cors());
app.use(express.json());

app.use(middleware.requestLogger);
app.use(middleware.tokenExtractor);

app.use("/api/login", loginRouter);
app.use("/api/blogs", blogRouter);
app.use("/api/users", usersRouter);

app.use(middleware.unknownEndpoint);
app.use(middleware.errorHandler);

module.exports = app;
