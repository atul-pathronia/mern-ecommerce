const app = require("../backend/app");
const cloudinary = require("cloudinary");
const connectDatabase = require("../backend/config/database");

process.on("uncaughtException", (err) => {
  console.log(`ErrorL ${err.message}`);
  console.log("Shutting down server due to uncaught exception");

  process.exit(1);
});

if (process.env.NODE_ENV !== "PRODUCTION") {
  require("dotenv").config({ path: "backend/config/config.env" });
}

connectDatabase();

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUD_API,
  api_secret: process.env.CLOUD_SECRET,
});

const server = app.listen(process.env.PORT, () => {
  console.log(`App running on ${process.env.PORT}`);
});

// unhandled promise rejection
process.on("unhandledRejection", (err) => {
  console.log(`ErrorL ${err.message}`);
  console.log("Shutting down server due to unhandled promise rejection");
  server.close(() => {
    process.exit(1);
  });
});
