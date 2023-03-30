require('dotenv').config();

const { env } = process;

module.exports = {
  mongoUrl: env.MONGO_URL,
  jwtSecret: env.JWT_SECRET,
  host: env.HOST,
};
