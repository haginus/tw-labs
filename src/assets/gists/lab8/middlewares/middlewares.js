const express = require('express');
const app = express();

app.use((req, res, next) => {
  console.log('Am primit un request la:', Date.now());
  next();
});