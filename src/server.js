const app = require("./app");
const env = require("./config/env");
const { connectMongo } = require("./db/mongo");

async function bootstrap() {
  try {
    await connectMongo();

    app.listen(env.port, () => {
      console.log(`Server running on port ${env.port}`);
    });
  } catch (error) {
    console.error("Failed to start server", error);
    process.exit(1);
  }
}

bootstrap();
