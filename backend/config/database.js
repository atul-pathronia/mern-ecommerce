const mongoose = require("mongoose");

// DATABASER CONNECTION
const connectDatabase = () => {
  mongoose
    .connect(process.env.ONLINE_DB)
    .then((data) => {
      console.log(`Database connected successfully to ${data.connection.host}`);
    })
    .catch((err) => {
      console.log(err);
    });
};

module.exports = connectDatabase;
