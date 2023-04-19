const thoughtRouter = require('./thoughtsRouter');
const userRouter = require('./userRouter');
const router = require('express').Router();

//splits up the routes to be used as specified
router.use('/thoughts', thoughtRouter);
router.use('/users', userRouter);

module.exports = router;