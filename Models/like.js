module.exports = (Sequelize, DataTypes) => {
    return Sequelize.define('like', {
        id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            primaryKey: true
        },
        type: {
            type: DataTypes.ENUM,
            values: ['post', 'comment'],
            allowNull: false
        }
    })
}