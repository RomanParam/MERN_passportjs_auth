import express from 'express';
import passport from 'passport';
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
  return res.status(401).json({ session: false, message: message });
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

// Регистрация пользователя
router.post('/signup', (req, res, next) => {
  passport.authenticate('local', (err, user, info) => {
    console.log('err', err?.message);
    console.log('user', user);
    console.log('info', info);
    if (err) return res.json({ session: false, message: err.message, err });
    if (!user)
      return res.json({ session: false, message: 'Пользователь не найден' });
    req.logIn(user, function (err) {
      if (err) return res.json({ session: false, message: err.message, err });
      else
        return res.json({
          session: true,
          message: `Пользователь ${user.name} ${info.message}`,
          user: serializeUser(user),
        });
    });
  })(req, res, next);
});

// Аутентификация пользователя
router.post('/signin', passport.authenticate('local'), (req, res) => {
  return res.json({
    session: true,
    message: `Успешный вход ${req.user.name}`,
    user: serializeUser(req.user),
  }); // ответ браузеру
});

// passportJS req.logout(); не работает!!!
// https://stackoverflow.com/questions/13758207/why-is-passportjs-in-node-not-removing-session-on-logout
router.get('/signout', (req, res, next) => {
  req.session.destroy((err) => {
    if (err) return res.status(400).end();
    res.clearCookie('connect.sid');
    return res.json({ message: 'Успешный выход' });
  });
});

router.get('/check', isAuth, (req, res) => {
  res.json({ session: true, message: 'авторизован', user: serializeUser(req.user) });
});

export default router;
