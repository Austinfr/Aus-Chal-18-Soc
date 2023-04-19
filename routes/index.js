const router = require('express').Router();
const apiRoutes = require('./api');

//sets up the api routes to be used
router.use('/api', apiRoutes);

module.exports = router;