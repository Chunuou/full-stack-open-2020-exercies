const config = require("./utils/config");
const app = require("./app");
const http = require("http");
const loggr=  require("./utils/logger")

const server = http.createServer(app);

server.listen(config.SERVER_PORT, () => {
  loggr.info(`Server running on port ${config.SERVER_PORT}`);
});
