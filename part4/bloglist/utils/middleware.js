const logger = require("./logger");

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
  }
  if (error.name === "JsonWebTokenError") {
    return response.status(401).json({ error: "invalid token" });
  }

  next(error);
};

const tokenExtractor = (request, response, next) => {
  const authorization = request.get("authorization");
  if (authorization && authorization.toLowerCase().startsWith("bearer ")) {
    request.token = authorization.substring(7);
  }
  next();
};

module.exports = {
  requestLogger,
  unknownEndpoint,
  errorHandler,
  tokenExtractor,
};
