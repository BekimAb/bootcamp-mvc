const router= require('express').Router();
const apiRoutes= require('./api/');
const Routes= require('./routes.js');
const dashboard= require('./dashboard.js');

router.use('/', Routes);
router.use('/dashboard', dashboard);
router.use('/api', apiRoutes);

module.exports= router;