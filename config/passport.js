import passport from 'passport';
import passportLocal from 'passport-local';
import passportVkontakte from 'passport-vkontakte';
import bcrypt from 'bcrypt';
import User from '../src/models/user.js';

const LocalStrategy = passportLocal.Strategy;
const VKontakteStrategy = passportVkontakte.Strategy;

// эти две функции с сайта паспорта, они записывают объект юзера в req.user
passport.serializeUser(function (user, done) {
  // эта ф-я отрабатывает когда вызывается done(null, user) из passport.use
  console.log('serializeUser passport.js', user.id);
  done(null, user.id); // записывает в сессию user.id
});

passport.deserializeUser(function (id, done) {
  // эта функция отрабатывает при каждом запросе
  User.findById(id, function (err, user) {
    console.log('deSerializeUser passport.js', user.name);
    done(err, { name: user.name, id: user.id });
  });
});

const localAuth = async (req, email, pass, done) => {
  const name = req.body.name;
  console.log('>>>>>>>>>>>>>>>PASSPORT<<<<<<<<<<<<<<<<<<<');
  try {
    if (/signin/.test(req.path)) {
      // /auth/signup
      const user = await User.findOne({ email }).exec();
      if (user && (await bcrypt.compare(pass, user.password)))
        return done(null, user);
      else return done(null, false);
    }
    if (/signup/.test(req.path) && email && pass && name) {
      // /auth/signup
      const hashPass = await bcrypt.hash(pass, 10);
      const newUser = new User({
        name: name,
        email: email,
        password: hashPass,
      });
      await newUser.save();
      done(null, newUser, { message: 'успешно создан' }); // req.user = newUser;
    }
  } catch (error) {
    console.log('Catch err: ', error?.message);
    done(error);
  }
};

// const vkAuth = (accessToken, refreshToken, params, profile, done) => {
//
//   // Now that we have user's `profile` as seen by VK, we can
//   // use it to find corresponding database records on our side.
//   // Also we have user's `params` that contains email address (if set in
//   // scope), token lifetime, etc.
//   // Here, we have a hypothetical `User` class which does what it says.
//   // User.findOrCreate({ vkontakteId: profile.id })
//   //   .then(function (user) { done(null, user); })
//   //   .catch(done);
// }

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

// passport.use(
//   new VKontakteStrategy(
//     {
//       clientID: VKONTAKTE_APP_ID, // VK.com docs call it 'API ID', 'app_id', 'api_id', 'client_id' or 'apiId'
//       clientSecret: VKONTAKTE_APP_SECRET,
//       callbackURL: 'http://localhost:3000/auth/vkontakte/callback',
//     },
//     vkAuth
//   )
// );
