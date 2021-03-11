export default (req, res, next) => {
  if (req.session.user) res.locals.username = req.session?.user?.name;
  next();
};
