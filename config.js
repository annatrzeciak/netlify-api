require("dotenv").config();

module.exports = {
  // MONGO CONFIG
  URL_MONGO: `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0-cr7xd.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority`,
  SECRET: 'mySecretKey123@!' || process.env.SECRET
};
