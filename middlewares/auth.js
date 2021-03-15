export default (req, res, next) => {
  console.log('middleware/auth.js req.user:', req.user);
  if (!req.user) {
    console.log('middleware - not authorize')
    res.json({session: false, message: 'not authorize'})
  } else next();
};
