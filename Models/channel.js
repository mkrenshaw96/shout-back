module.exports = (Sequelize, DataTypes) => {
    return Sequelize.define('channel', {
        id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            primaryKey: true
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false
        }
    })
}