const express = require('express');
const cors = require('cors');
const path = require('path');

const app = express();

app.use(cors());

const gistRoutes = require('./backend/src/gist.route.js');

app.use('/api/gists', gistRoutes);

//Serve only the static files form the dist directory
app.use(express.static(__dirname + '/dist/tw-labs'));

app.get('/*', function (req, res) {
  res.sendFile(path.join(__dirname + '/dist/tw-labs/index.html'));
});

// Start the app by listening on the default Heroku port
app.listen(process.env.PORT || 3000);