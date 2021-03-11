import express from 'express';

const router = express.Router();

router.use((req, res, next) => {
  console.log('routes/index.js file: Выполняется при каждом запросе');
  next();
});

router.get('/', (req, res) => {
  console.log('routes/index.js file: res.locals: ', res.locals);
  res.json({message: 'hi'})
});

export default router;
