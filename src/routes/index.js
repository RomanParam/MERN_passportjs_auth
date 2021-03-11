import express from 'express';

const router = express.Router();

router.get('/', (req, res) => {
  console.log('routes/index.js file: res.locals: ', res.locals);
  res.json({message: 'hi'})
});

export default router;
