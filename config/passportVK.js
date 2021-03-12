import passport from 'passport';
import passportVkontakte from 'passport-vkontakte';
import User from '../src/models/user.js';

const VKontakteStrategy = passportVkontakte.Strategy;

const vkAuth = (accessToken, refreshToken, params, profile, done) => {

  // Now that we have user's `profile` as seen by VK, we can
  // use it to find corresponding database records on our side.
  // Also we have user's `params` that contains email address (if set in
  // scope), token lifetime, etc.
  // Here, we have a hypothetical `User` class which does what it says.
  User.findOrCreate({ vkontakteId: profile.id })
    .then(function (user) { done(null, user); })
    .catch(done);
}

passport.use(
  new VKontakteStrategy(
    {
      clientID: '7788203', // VK.com docs call it 'API ID', 'app_id', 'api_id', 'client_id' or 'apiId'
      clientSecret: 'I1o4LazxMuQzDE0bFxZi',
      callbackURL: 'https://mern-passportjs.herokuapp.com',
    },
    vkAuth
  )
);
