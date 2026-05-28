const app = require("./app");
const env = require("./config/env");
const { connectMongo } = require("./db/mongo");

let retryTimer = null;

async function tryConnectMongo() {
  try {
    await connectMongo();
    return true;
  } catch (error) {
    console.error("MongoDB initial connection failed", error.message);
    return false;
  }
}

function scheduleMongoReconnect() {
  if (retryTimer) {
    return;
  }

  retryTimer = setInterval(async () => {
    try {
      await connectMongo();
      console.log("MongoDB reconnected");
      clearInterval(retryTimer);
      retryTimer = null;
    } catch (error) {
      console.error("MongoDB reconnect failed", error.message);
    }
  }, 15000);
}

async function bootstrap() {
  const mongoConnected = await tryConnectMongo();

  if (!mongoConnected) {
    scheduleMongoReconnect();
  }

  app.listen(env.port, () => {
    console.log(`Server running on port ${env.port}`);
  });
}

bootstrap();
