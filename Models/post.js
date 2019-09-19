module.exports = (Sequelize, DataTypes) => {
	return Sequelize.define('post', {
		id: {
			type: DataTypes.UUID,
			defaultValue: DataTypes.UUIDV4,
			primaryKey: true
		},
		text: {
			type: DataTypes.STRING(140),
			allowNull: true
		},
		location: {
			type: DataTypes.STRING,
			allowNull: true
		},
		postPicUrl: {
			type: DataTypes.STRING,
			isUrl: true,
			allowNull: true
		},
		postVidUrl: {
			type: DataTypes.STRING,
			isUrl: true,
			allowNull: true
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
	});
};
