const router = require('express').Router();
const AUTH = require('../Middleware/auth');
const db = require('../db');

//GET MY FEED
router.get('/', AUTH, (req, res) => {
    db.FOLLOW.findAll({
        where: {
            userId: req.user.id
        }
    })
        .then(foundUsers => {
            let ids = foundUsers.map(x => x.followingUserId)
            // db.LIKE.findAll({
            //     where: {
            //         userId: req.user.id,
            //         postId: ids,
            //         type: post
            //     }
            // })
            db.POST.findAll({
                where: {
                    userId: ids
                },
                include: [{
                    model: db.USER
                }],
                order: [
                    ['createdAt', 'DESC']
                ]
            })
                .then(found => res.status(200).json(found))
                .catch(err => res.status(500).json(err))
        })
        .catch(err => res.status(500).json(err))
})

module.exports = router;