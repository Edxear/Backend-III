require("dotenv").config();

const env = {
  nodeEnv: process.env.NODE_ENV || "development",
  port: Number(process.env.PORT || 3000),
  mongodbUri: process.env.MONGODB_URI || "mongodb://localhost:27017/final_backend_iii",
  mongodbDbName: process.env.MONGODB_DB_NAME || "final_backend_iii"
};

module.exports = env;
