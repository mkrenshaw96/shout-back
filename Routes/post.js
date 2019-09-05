const router = require('express').Router();
const db = require('../db');
const AUTH = require('../Middleware/auth');
const multer = require('multer');
const multerS3 = require('multer-s3');
const AWS = require('aws-sdk');

//CREATING THE s3 OBJECT
const ACCESS = new AWS.S3({
    accessKeyId: process.env.ACCESS_KEY_ID,
    secretAccessKey: process.env.SECRET_ACCESS_KEY,
    region: process.env.REGION
});

//AWS MULTER ACCESS FOR UPLOAD
const upload = multer({
    storage: multerS3({
        s3: ACCESS,
        bucket: process.env.BUCKET1,
        acl: 'public-read',
        metadata: (req, file, cb) => {
            cb(null, { fieldName: file.fieldname });
        },
        key: (req, file, cb) => {
            cb(null, `-IMAGE-${req.user.username}` + '-' + Date.now() + '-' + file.originalname)
        }
    })
})

//CREATE A SINGLE POST
router.post('/create', AUTH, upload.single('image'), (req, res) => {
    const newPost = {
        // postPicUrl: req.file.location ? req.file.location : null,
        text: req.body.text ? req.body.text : null,
        // postVidUrl: req.file.location ? req.file.location : null,
        repostAmount: 0,
        likeAmount: 0,
        commentAmount: 0
    }
    db.USER.findOne({
        where: {
            id: req.user.id
        }
    })
        .then(foundUser => {
            foundUser.createPost(newPost)
                .then(createdPost => res.status(200).json(createdPost))
                .catch(err => res.status(500).json(err))
        })
        .catch(err => res.status(500).json(err))
})

//GET ALL USERS
router.get('/all', (req, res) => {
    db.POST.findAll({
        include: [{
            model: db.USER
        }]
    })
        .then(foundPosts => res.status(200).json(foundPosts))
        .catch(err => res.status(500).json(err))
})

module.exports = router;