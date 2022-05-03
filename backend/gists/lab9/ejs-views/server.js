const express = require('express')
const app = express();

app.set('view engine', 'ejs');
app.set('views', 'templates');

app.get('/', (req, res) => {
  res.render('pages/index', { today: new Date() });
});

app.listen(3000);

