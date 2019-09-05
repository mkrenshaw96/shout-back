const Sequelize = require('sequelize');
const sequelize = new Sequelize(process.env.NAME, 'postgres', process.env.PASSWORD, {
    dialect: 'postgres',
    host: 'localhost'
})

sequelize.authenticate()
    .then(() => console.log('POSTGRES DATA BASE CONNECTION SUCCESSFUL'))
    .catch(err => console.log(err))

//CREATE AN EMPTY DB OBJECT
const db = {};

//ADD SEQUELIZE TO THE USER OBJECT
db.Sequelize = Sequelize;
db.sequelize = sequelize;

//BRING IN MODELS
db.USER = require('./Models/user')(sequelize, Sequelize);
db.POST = require('./Models/post')(sequelize, Sequelize);
db.COMMENT = require('./Models/comment')(sequelize, Sequelize);
db.LIKE = require('./Models/like')(sequelize, Sequelize);
db.FOLLOW = require('./Models/follow')(sequelize, Sequelize);
db.MESSAGE = require('./Models/message')(sequelize, Sequelize);
db.CHANNEL = require('./Models/channel')(sequelize, Sequelize);

//USER ASSOCIATIONS
db.USER.hasMany(db.POST)
db.USER.hasMany(db.COMMENT)
db.USER.hasMany(db.LIKE)
db.USER.hasMany(db.FOLLOW)
db.USER.hasMany(db.MESSAGE)
db.USER.belongsTo(db.CHANNEL)

//POST ASSOCIATIONS
db.POST.hasMany(db.LIKE)
db.POST.hasMany(db.COMMENT)
db.POST.belongsTo(db.USER)

//COMMENT ASSOCIATIONS
db.COMMENT.hasMany(db.COMMENT)
db.COMMENT.belongsTo(db.COMMENT)
db.COMMENT.belongsTo(db.USER)
db.COMMENT.belongsTo(db.POST)

//LIKE ASSOCIATIONS
db.LIKE.belongsTo(db.USER)
db.LIKE.belongsTo(db.POST)

//MESSAGE ASSOCIATIONS
db.MESSAGE.belongsTo(db.USER)
db.MESSAGE.belongsTo(db.CHANNEL)

//CHANNEL ASSOCIATIONS
db.CHANNEL.hasMany(db.USER)
db.CHANNEL.hasMany(db.MESSAGE)

//FOLLOW ASSOCIATIONS
db.FOLLOW.belongsTo(db.USER)

module.exports = db;