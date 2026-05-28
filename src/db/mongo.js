const mongoose = require("mongoose");
const env = require("../config/env");

async function connectMongo() {
  await mongoose.connect(env.mongodbUri, {
    dbName: env.mongodbDbName
  });

  console.log("MongoDB connected");
}

async function disconnectMongo() {
  await mongoose.disconnect();
}

module.exports = {
  connectMongo,
  disconnectMongo
};
