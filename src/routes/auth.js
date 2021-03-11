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
router.get('/vkontakte', passport.authenticate('vkontakte'));
router.post('/signin', passport.authenticate('local'), signIn);
router.get('/signout', signOut);
router.delete('/del', isAuth, deleteUsers, signOut);
router.get('/check', isAuth, sendStatus);

export default router;
