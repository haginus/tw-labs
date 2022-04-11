const express = require('express');
const { getGist, getNormalPath } = require('./gist.service');
const router = express.Router()

router.get('/:gistFolder/:gistName/_', async (req, res) => {
  const { gistFolder, gistName } = req.params;
  const gistId = `${gistFolder}/${gistName}`;
  const { meta } = await getGist(gistId);
  if(!meta) return res.status(404).send('Not found');
  res.send(meta);
});

router.all('/:gistFolder/:gistName/**', async (req, res) => {
  const { gistFolder, gistName } = req.params;
  const gistId = `${gistFolder}/${gistName}`;
  const request = {
    ...req,
    path: getNormalPath(req.path),
  }
  const { response } = await getGist(gistId, request);
  res.send(response);
});


module.exports = router;