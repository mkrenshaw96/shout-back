const router = require('express').Router();
const db = require('../db');
const bcrypt = require('bcryptjs');
const JWT = require('jsonwebtoken');

//CREATE A NEW USER
router.post('/signup', function (req, res) {
    const newUser = {
        name: req.body.name,
        email: req.body.email,
        username: req.body.username,
        password: bcrypt.hashSync(req.body.password)
    }
    db.USER.create(newUser)
        .then(function (createdUser) {
            let token = JWT.sign({
                id: createdUser.id
            }, process.env.JWT_SECRET, {
                    expiresIn: 60 * 60 * 24
                })
            res.status(200).json({
                message: 'USER SUCCESSFULLY CREATED',
                sessionToken: token,
                status: 200,
                user: createdUser
            })
        })
        .catch(function (err) {
            res.status(500).json(err)
        })
})

//LOGIN A USER
router.post('/login', function (req, res) {
    const username = req.body.username;
    db.USER.findOne({
        where: {
            username: username
        }
    })
        .then(function (foundUser) {
            bcrypt.compare(req.body.password, foundUser.password, function (err, match) {
                if (!err && match) {
                    let token = JWT.sign({
                        id: foundUser.id
                    }, process.env.JWT_SECRET, {
                            expiresIn: 60 * 60 * 24
                        })
                    res.status(200).json({
                        message: 'USER SUCCESSFULLY SIGNED IN',
                        sessionToken: token,
                        status: 200,
                        user: foundUser
                    })
                } else {
                    res.status(401).json({ status: 401, message: 'PASSWORDS DO NOT MATCH' })
                }
            })
        })
        .catch(err => res.status(404).json({ status: 404, message: 'USERNAME IS NOT FOUND' }))
})

//GET ALL USERS
router.get('/all', function (req, res) {
    db.USER.findAll()
        .then(function (foundUsers) {
            res.status(200).json(foundUsers)
        })
        .catch(function (err) {
            res.status(500).json(err)
        })
})
module.exports = router;