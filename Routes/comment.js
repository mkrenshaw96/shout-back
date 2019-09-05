const router = require('express').Router();
router.get('/', function (req, res) {
    res.status(200).json('COMMENT WORKS');
})
module.exports = router;