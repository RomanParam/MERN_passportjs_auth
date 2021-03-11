import express from 'express';
import session from 'express-session'; // библиотека для работы с сессиями// cookie-parser уже включен в express-session
import passport from 'passport';
import path from 'path';
import morgan from 'morgan';
import cors from 'cors';

// подключаем базы данных (обычную и для хранения сессий).
import './config/db.js';
import MongoStore from "connect-mongo";

// подключаем настройки паспорта
import './config/passport.js';
import './config/passportVK.js'

import indexRouter from './src/routes/index.js';
import authRouter from './src/routes/auth.js';

import userMiddleware from './middlewares/user.js';
import notFoundMiddleware from './middlewares/notfound404.js';
import errorMiddleware from './middlewares/error.js';

const app = express();
const dirname = path.resolve();

app.use(express.static(path.join(dirname, 'client', 'build'))); // middlewares
app.use(express.json());
app.use(morgan('dev'));

const corsOptions = {
  // origin: /\.your.domain\.com$/,    // reqexp will match all prefixes
  origin: '*',
  methods: "GET,HEAD,POST,PATCH,DELETE,OPTIONS",
  credentials: true,                // required to pass
  allowedHeaders: "Content-Type, Authorization, X-Requested-With Al",
}
app.use(cors());

app.use(
  session({
    // ключ для шифрования cookies // require('crypto').randomBytes(16).toString('hex') - генерация ключа
    secret: process.env.SESSION_SECRET,
    store: MongoStore.create({ mongoUrl: process.env.SESSION_DB_PATH }),
    resave: false, // Если true, сохраняет сессию, даже если она не поменялась
    saveUninitialized: false, // Если false, куки появляются только при установке req.session
    cookie: {
      // В продакшне нужно "secure: true" для HTTPS
      secure: process.env.NODE_ENV === 'production',
      maxAge: 1000 * 60 * 60 * 24 * 365, // время жизни cookies, ms
    },
  }),
);

app.use(passport.initialize());
app.use(passport.session()); //passport.js записавает сессии в req.user

// // записывает имя пользователя в переменную res.locals.username, если он авторизован в системе
app.use(userMiddleware);

app.use('/api', indexRouter);
app.use('/api/auth', authRouter);

app.get('*', (req, res) => {
  res.sendFile(path.join(dirname, 'client', 'build', 'index.html'));
});

// союда программа дойдет, если не сработает ни один роут.
app.use(notFoundMiddleware);

// ф-я errorMiddleware выполниться, если в каком-то роуте,
// вызовется ф-я next('some value') с аргументом
app.use(errorMiddleware);

const port = process.env.PORT ?? 3100;
app.listen(port, () => {
  console.log('Сервер запущен. Порт:', port);
});
