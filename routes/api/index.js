const thoughtRouter = require('./thoughtsRouter');
const userRouter = require('./userRouter');
const router = require('express').Router();

router.use('/thoughts', thoughtRouter);
router.use('/users', userRouter);

module.exports = router;