const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
  res.status(200).json({response: '생성 성공'});
});

module.exports = router;
