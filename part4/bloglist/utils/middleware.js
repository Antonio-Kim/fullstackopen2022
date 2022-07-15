const logger = require("./logger");
const jwt = require("jsonwebtoken");
// const User = require("../models/user");

const requestLogger = (request, response, next) => {
  logger.info("Method: ", request.method);
  logger.info("Path:   ", request.path);
  logger.info("Body:   ", request.body);
  logger.info("---");

  next();
};

const unknownEndpoint = (request, response, next) => {
  response.status(404).json({ message: "unknown endpoint " });
  next(error);
};

const errorHandler = (error, request, response, next) => {
  logger.error(error.message);

  if (error.name === "CastError") {
    return response.status(400).json({ error: "malformatted id" });
  } else if (error.name === "ValidationError") {
    return response.status(400).json({ error: error.message });
  } else if (error.name === "JsonWebTokenError") {
    return response.status(401).json({
      error: "token missing or invalid",
    });
  } else if (error.name === "TokenExpiredError") {
    return response.status(401).json({
      error: "token expired",
    });
  }

  next(error);
};

const tokenExtractor = (request, response, next) => {
  const authorization = request.get("authorization");

  try {
    if (authorization && authorization.toLowerCase().startsWith("bearer ")) {
      request.token = authorization.substring(7);
    }
  } catch (exception) {
    next(exception);
    return response.status(401).json({ error: "token missing or invalid " });
  }

  next();
};

const userExtractor = async (request, response, next) => {
  try {
    const token = request.token;
    if (token === "null") {
      return response.status(401).send("No token given");
    }
    request.user = await jwt.verify(request.token, process.env.SECRET);
    if (!request.user) {
      return response.status(401).send("Unauthorized request");
    }
  } catch (exception) {
    next(exception);
  }

  next();
};

module.exports = {
  requestLogger,
  unknownEndpoint,
  errorHandler,
  tokenExtractor,
  userExtractor,
};
