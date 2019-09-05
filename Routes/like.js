const router = require('express').Router();
const AUTH = require('../Middleware/auth');
const db = require('../db');
router.post('/post/:id', AUTH, (req, res) => {
    db.POST.findOne({
        where: {
            id: req.params.id
        }
    })
        .then(foundPost => {
            foundPost.createLike({
                type: 'post',
                userId: req.user.id
            })
                .then(created => res.status(200).json(created))
                .catch(err => res.status(500).json(err))
        })
        .catch(err => res.status(500).json(err))
})
module.exports = router;