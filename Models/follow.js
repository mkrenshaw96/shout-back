module.exports = (Sequelize, DataTypes) => {
    return Sequelize.define('follow', {
        id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            primaryKey: true
        },
        followingUserId: {
            type: DataTypes.STRING,
            allowNull: false
        }
    })
}