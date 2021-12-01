const router = require('express').Router();
const apiRoutes = require('./api');
const path = require('path');

router.use('/api', apiRoutes);
router.get('/stats', function(req, res) {
  res.sendFile(path.join(__dirname, '../public/stats.html'));
});
router.get('/exercise', function(req, res) {
  res.sendFile(path.join(__dirname, '../public/exercise.html'));
});

module.exports = router;