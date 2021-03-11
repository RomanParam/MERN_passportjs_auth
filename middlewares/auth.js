export default (req, res, next) => {
  console.log('middleware/auth.js req.user:', req.user);
  if (!req.user) {
    res.json({session: false, message: 'not authorize'})
  } else next();
};
