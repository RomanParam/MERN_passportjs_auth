export default (req, res, next) => {
  console.log('file-auth.js req.session.user:', req.session.user);
  if (!req.session.user) {
    res.json({session: false, message: 'not authorize'})
  } else next();
};
