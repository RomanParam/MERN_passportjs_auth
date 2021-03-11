import mongoose from "mongoose";
import connectMongo from "connect-mongo";
import session from "express-session";
import dotenv from "dotenv";

dotenv.config();
// хранилице для сессий. можно использловать другие: https://github.com/expressjs/session#compatible-session-stores
const MongoStore = connectMongo(session);

// подключаем базу данных
mongoose
  .connect(process.env.DB_PATH, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Mongoose connected to %s database", process.env.DB_PATH);
  })
  .catch((err) => {
    console.log("Database connection error", err.message);
  });

// подкл. базу данных для хранения сессий
const sessionStore = new MongoStore({
  mongooseConnection: mongoose.createConnection(process.env.SESSION_DB_PATH, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
  }),
});

export default sessionStore;
