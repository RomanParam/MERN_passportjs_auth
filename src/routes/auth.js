import express from 'express';
import passport from 'passport';
import isAuth from '../../middlewares/auth.js';
import {
  deleteUsers,
  signIn,
  signOut,
  signupLocalPassport,
  sendStatus
} from '../controllers/auth.js';

const router = express.Router();

router.post('/signup', signupLocalPassport);
router.post('/signin', passport.authenticate('local'), signIn);
router.get('/signout', signOut);
router.delete('/del', isAuth, deleteUsers, signOut);
router.get('/check', isAuth, sendStatus);

router.get('/vkontakte', passport.authenticate('vkontakte'));
router.get('/vkontakte/callback',
  passport.authenticate('vkontakte', {
    successRedirect: '/',
    failureRedirect: '/signin'
  })
);

router.get('/google',
  passport.authenticate('google', { scope: ['profile'] }));
router.get('/google/callback',
  passport.authenticate('google', { failureRedirect: '/signin' }),
  function(req, res) {
    // Successful authentication, redirect home.
    res.redirect('/');
  });

export default router;
