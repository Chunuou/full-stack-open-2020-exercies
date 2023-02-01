// eslint-disable-next-line max-params

const logger = require("./logger");

const tokenExtractor = (request, response, next) => {
  request.token = null;

  const authorization = request.get("authorization");
  if (authorization && authorization.toLowerCase().startsWith("bearer")) {
    request.token = authorization.substring(7);
  }

  next();
};

const requestLogger = (request, response, next) => {
  logger.info("Method:", request.method);
  logger.info("Path:  ", request.path);
  logger.info("Body:  ", request.body);
  logger.info("Token:  ", request.token);
  logger.info("----request end----");
  next();
};

const responseLogger = (request, response, next) => {
  logger.info("Method:", response.method);
  logger.info("Body:  ", response.body);
  logger.info("----response end----");
  next();
};

const errorHandler = (error, request, response, next) => {
  if (error.name === "CastError" && error.kind === "ObjectId") {
    return response.status(400).json({ error: "malformatted id" });
  }
  if (error.name === "ValidationError") {
    return response.status(400).json({ error: error.message });
  }
  if (error.name === "JsonWebTokenError") {
    return response.status(401).json({ error: "invalid token" });
  }
  next(error);
};

module.exports = {
  tokenExtractor,
  requestLogger,
  responseLogger,
  errorHandler,
};
