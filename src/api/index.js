const express = require('express');

const emojis = require('./emojis');
const secret = require('./secret');

const router = express.Router();

router.get('/', (req, res) => {
  res.json({
    message: 'API - 👋🌎🌍🌏',
  });
});

router.use('/emojis', emojis);

router.use('/secret', secret);

module.exports = router;
