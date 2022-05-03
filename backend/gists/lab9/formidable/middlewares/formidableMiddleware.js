const formidable = require('formidable');

module.exports = (options) => {
  return (req, res, next) => {
    const form = formidable(options);
    form.parse(req, (err, fields, files) => {
      if(err) {
        return next(err);
      }
      req.body = fields;
      req.files = files;
      next();
    });
  }
}