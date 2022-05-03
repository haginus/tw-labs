const express = require('express')
const app = express();
const formidableMiddleware = require('./middlewares/formidableMiddleware');

app.set('view engine', 'ejs');

app.get('/', (req, res) => {
  res.render('pages/index');
});

app.post('/', 
  formidableMiddleware({ 
    filter: ({ mimetype }) => mimetype && mimetype.includes("image")
  }),
  (req, res) => {
    const picture = req.files.picture;
    if(!picture) {
      res.send('Poza nu a fost trimisă.')
    }
    res.send(`Salut, ${req.body.author}! Poza ta are ${picture.size} bytes.`);
});

app.listen(3000);