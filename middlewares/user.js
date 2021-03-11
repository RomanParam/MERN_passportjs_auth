export default (req, res, next) => {
  console.log('user', req.user)
  if (req.user) res.locals.username = req.user?.name; //passport.js записавает сессии в req.user
  next();
};
