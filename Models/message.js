module.exports = (Sequelize, DataTypes) => {
    return Sequelize.define('message', {
        id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            primaryKey: true
        },
        text: {
            type: DataTypes.STRING,
            allowNull: false
        }
    })
}