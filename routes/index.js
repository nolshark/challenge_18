const router = require('express').Router();
const apiRouter = require('./api');

router.use('/api', apiRouter);

router.use((_, res) => {
    res.status(404).json('Not a valid route')
});

module.exports = router;