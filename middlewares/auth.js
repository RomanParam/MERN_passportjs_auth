export default (req, res, next) => {
  console.log('file-auth.js req.session.user:', req.user);
  if (!req.user) {
    res.json({session: false, message: 'not authorize'})
  } else next();
};
