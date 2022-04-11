app.use((req, res, next) => {
  res.status(404).sendFile("404.html");
});