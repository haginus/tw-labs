const express = require('express');
const { getGist, getNormalPath } = require('./gist.service');
const router = express.Router()

router.get('/:gistFolder/:gistName/_', (req, res) => {
  const { gistFolder, gistName } = req.params;
  const gistId = `${gistFolder}/${gistName}`;
  const { meta } = getGist(gistId);
  if(!meta) return res.status(404).send('Not found');
  res.send(meta);
});

router.all('/:gistFolder/:gistName/**', (req, res) => {
  const { gistFolder, gistName } = req.params;
  const gistId = `${gistFolder}/${gistName}`;
  const { listeners } = getGist(gistId);
  if(!listeners) return res.status(404).send('Not found');
  const request = {
    ...req,
    path: getNormalPath(req.path),
  }
  const handler = listeners[request.method.toLowerCase()];
  const { response } = handler(request);
  if(!response) return res.status(404).send('Not Found');
  res.send(response.send.getCall(0).args[0]);
});



module.exports = router;