app.get('/example/b', (req, res, next) => {
  console.log('răspunsul va fi trimis de următoarea funcție...');
  next();
}, (req, res) => {
  res.send('Hello from B!');
});