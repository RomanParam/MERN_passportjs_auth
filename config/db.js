import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

// подключаем базу данных
mongoose
  .connect(process.env.DB_PATH, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log('Mongoose connected to %s database', process.env.DB_PATH);
  })
  .catch((err) => {
    console.log('Database connection error', err.message);
  });
