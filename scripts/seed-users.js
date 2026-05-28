const mongoose = require("mongoose");
const env = require("../src/config/env");
const UserModel = require("../src/models/user.model");

const seedUsers = [
  {
    firstName: process.env.SEED_ADMIN_FIRST_NAME || "Admin",
    lastName: process.env.SEED_ADMIN_LAST_NAME || "Backend",
    email: process.env.SEED_ADMIN_EMAIL || "admin.finalbackend@example.com",
    role: "admin",
    password: process.env.SEED_ADMIN_PASSWORD || "admin123"
  },
  {
    firstName: "Lucia",
    lastName: "Tester",
    email: "lucia.tester@example.com",
    role: "user",
    password: "user123"
  },
  {
    firstName: "Mateo",
    lastName: "QA",
    email: "mateo.qa@example.com",
    role: "user",
    password: "user123"
  }
];

async function run() {
  try {
    await mongoose.connect(env.mongodbUri, {
      dbName: env.mongodbDbName
    });

    for (const user of seedUsers) {
      await UserModel.findOneAndUpdate(
        { email: user.email },
        user,
        { upsert: true, new: true, setDefaultsOnInsert: true }
      );
    }

    const total = await UserModel.countDocuments();
    console.log(`Users seeded successfully. Total users: ${total}`);
  } catch (error) {
    console.error("Error seeding users", error);
    process.exitCode = 1;
  } finally {
    await mongoose.disconnect();
  }
}

run();
