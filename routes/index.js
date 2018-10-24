const express = require('express')
const router = express.Router();

router.get('/', (req, res) => {
    res.render('index.jade')
});

router.use('/usa', require('./usa'))

module.exports = router;
