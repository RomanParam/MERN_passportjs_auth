import express from 'express';
import bcrypt from 'bcrypt';
import User from '../models/user.js';
import isAuth from '../../middlewares/auth.js';

const router = express.Router();

/**
 * Завершает запрос с ошибкой аутентификации
 * @param {object} res Ответ express
 */
function failAuth(res, message) {
  console.log('file-auth.js message:', message);
  return res.status(401).json({session: false, message: message})
}

/**
 * Подготавливает пользователя для записи в сессию
 * Мы не хотим хранить пароль в сессии, поэтому извлекаем только нужные данные
 * @param {object} user Объект пользователя из БД
 */
function serializeUser(user) {
  return {
    id: user.id,
    name: user.name,
  };
}

router
  .route('/signup')
  // Страница регистрации пользователя
  // .get((req, res) => res.render('signup', { isSignup: true }))
  // Регистрация пользователя
  .post(async (req, res) => {
    const { name, password, email } = req.body;
    try {
      // Мы не храним пароль в БД, только его хэш
      const saltRounds = 10;

      const hashedPassword = await bcrypt.hash(password, saltRounds);

      const user = await User.create({
        name,
        password: hashedPassword,
        email,
      });
      // записываем в req.session.user данные (id & name) (создаем сессию)
      req.session.user = serializeUser(user); // req.session.user -> id, name
    } catch (err) {
      console.error('Err message:', err.message);
      console.error('Err code', err.code);
      return failAuth(res, err.code);
    }
    // res.cookie("sid", 'dkfjhksfhskfj') // делает за вас express session библиотека
    return res.json({session: true, message: 'signUp successfully'}); // ответ браузеру + cookies
  });

router
  .route('/signin')
  // Страница аутентификации пользователя
  // .get((req, res) => res.render('signin', { isSignin: true }))
  // Аутентификация пользователя
  .post(async (req, res) => {
    const { name, password } = req.body;
    try {
      // Пытаемся сначала найти пользователя в БД
      const user = await User.findOne({ name: name }).exec();
      if (!user)
        return failAuth(res, 'неверное имя/пароль');
      // Сравниваем хэш в БД с хэшем введённого пароля
      const isValidPassword = await bcrypt.compare(password, user.password);
      if (!isValidPassword)
        return failAuth(res, 'неверное имя/пароль');
      req.session.user = serializeUser(user); // записываем в req.session.user данные (id & name) (создаем сессию)
    } catch (err) {
      console.error('Err message:', err.message);
      console.error('Err code', err.code);
      return failAuth(res, err.message);
    }
    return res.json({session: true, message: 'login successfully'}); // ответ браузеру + cookies
  });


router.get('/signout', (req, res, next) => {
  req.session.destroy((err) => {
    if (err) return next(err);
    res.clearCookie('sid');
    return res.json({session: false, message: 'logout successfully'});
  });
});

router.get('/check', isAuth, (req, res) => {
  res.json({session: true, message: 'authorized'})
})

export default router;
