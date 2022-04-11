app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Ceva nu a mers bine!');
});

app.get('/user', async (req, res) => {
  try {
    const user = await getUser(); // Funcție asincronă
    req.send(user);
  } catch (err) {
    next(err); // Transmite eroarea mai departe
  }
});