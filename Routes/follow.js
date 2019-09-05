const router = require('express').Router();
const db = require('../db');
const AUTH = require('../Middleware/auth');
router.get('/', function (req, res) {
    res.status(200).json('FOLLOW WORKS');
})
router.post('/create', AUTH, (req, res) => {
    db.USER.findOne({
        where: {
            id: req.user.id
        }
    })
        .then(foundUser => {
            foundUser.createFollow({
                followingUserId: req.body.followingUserId
            })
                .then(createdFollow => {
                    res.status(200).json(createdFollow)
                })
                .catch(err => res.status(500).json(err))
        })
        .catch(err => res.status(500).json(err))
})
router.get('/mine', AUTH, (req, res) => {
    db.FOLLOW.findAll({
        where: {
            userId: req.user.id
        }, include: [{
            model: db.USER
        }]
    })
        .then(found => res.status(200).json(found))
        .catch(err => res.status(500).json(err))
})
router.delete('/unfollow/:id', AUTH, (req, res) => {
    db.FOLLOW.findOne({
        where: {
            followingUserId: req.params.id,
            userId: req.user.id
        }
    })
        .then(found => found.destroy())
        .then(() => res.status(200).json('USER SUCCESSFULLY UNFOLLOWED'))
        .catch(err => res.status(500).json(err))
})
module.exports = router;