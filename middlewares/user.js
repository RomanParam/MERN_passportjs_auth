export default (req, res, next) => {
  if (req.session.user) res.locals.username = req.user?.name; //passport.js записавает сессии в req.user
  next();
};
