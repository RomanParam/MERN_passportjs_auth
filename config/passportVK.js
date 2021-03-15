import passport from 'passport';
import passportVkontakte from 'passport-vkontakte';
import User from '../src/models/user.js';

const VKontakteStrategy = passportVkontakte.Strategy;

const vkAuth = async (accessToken, refreshToken, params, profile, done) => {
  let user = await User.findOne({ vkontakteId: profile.id });
  if (user) {
    done(null, user);
  } else {
    user = await User.create({
      name: profile.username,
      email: `${profile.username}_${profile.id}@${profile.provider}.ru`,
      password: profile.id,
      vkontakteId: profile.id,
    });
    done(null, user);
  }
};

passport.use(
  new VKontakteStrategy(
    {
      clientID: process.env.vkClientID,
      clientSecret: process.env.vkClientSecret,
      callbackURL: process.env.vkCallbackURL,
    },
    vkAuth
  )
);
