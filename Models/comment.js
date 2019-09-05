module.exports = (Sequelize, DataTypes) => {
    return Sequelize.define('comment', {
        id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            primaryKey: true
        },
        text: {
            type: DataTypes.STRING,
            allowNull: false
        },
        repostAmount: {
            type: DataTypes.INTEGER,
            allowNull: true
        },
        likeAmount: {
            type: DataTypes.INTEGER,
            allowNull: true
        },
        commentAmount: {
            type: DataTypes.INTEGER,
            allowNull: true
        }
    })
}