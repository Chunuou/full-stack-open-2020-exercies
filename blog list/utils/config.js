require("dotenv").config();

const MONGO_DB_URL =
  process.env.NODE_ENV === "test"
    ? process.env.MONGO_DB_URL_TEST
    : process.env.MONGO_DB_URL;
const SERVER_PORT = process.env.SERVER_PORT;

module.exports = {
  MONGO_DB_URL,
  SERVER_PORT,
};
