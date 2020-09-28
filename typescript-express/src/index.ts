import express from 'express';

const app = express();

app.use((req, res, next) => {
  console.log(new Date());
  next();
});

app.get('', (req, res, next) => {
  console.log(req.query);
  res.send('Helló világ');
});

app.listen(3000, () => {
  console.log('Server started on PORT: 3000.');
});
