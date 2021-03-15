import passport from 'passport';
import passportLocal from 'passport-local';

import bcrypt from 'bcrypt';
import User from '../src/models/user.js';

const LocalStrategy = passportLocal.Strategy;


// эти две функции с сайта паспорта, они записывают объект юзера в req.user
passport.serializeUser(function (user, done) {
  // эта ф-я отрабатывает когда вызывается done(null, user) из passport.use
  console.log('serializeUser passport.js', user.id);
  done(null, user.id); // записывает в сессию user.id
});

passport.deserializeUser(function (id, done) {
  // эта функция отрабатывает при каждом запросе
  User.findById(id, function (err, user) {
    console.log('deSerializeUser passport.js', user?.name);
    done(err, user);
  });
});

passport.use(
  new LocalStrategy(
    {
      usernameField: 'email', // переопределение полей
      passwordField: 'password',
      passReqToCallback: true,
    },
    localAuth
  )
);

async function localAuth(req, email, pass, done) {
  console.log('>>>>>>>>>>>>>>>PASSPORT<<<<<<<<<<<<<<<<<<<');
  const name = req.body.name;
  try {
    if (/signin/i.test(req.path)) {
      const user = await User.findOne({ email }).exec();
      if (user && (await bcrypt.compare(pass, user.password)))
        return done(null, user);
      else return done(null, false);
    }
    if (/signup/i.test(req.path) && email && pass && name) {
      const hashPass = await bcrypt.hash(pass, 10);
      const newUser = new User({
        name: name,
        email: email,
        password: hashPass,
      });
      await newUser.save();
      // { message: 'успешно создан' } ловиться в controllers/autn в аргументе info signupLocalPassport
      done(null, newUser, { message: 'успешно создан' });
    }
  } catch (error) {
    console.log('Catch err: ', error?.message);
    done(error);
  }
};

