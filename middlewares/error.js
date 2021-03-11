export default (err, req, res) => {
  console.error(err);
  res.status(500).json({message: 'server error status 500'});
};
