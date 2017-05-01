let express = require('express'),
    router = express.Router();

router.use('/api', require('./api'));
router.use('/session', require('./session'));
router.use(require('./misc'));

module.exports = router;
