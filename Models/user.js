module.exports = (Sequelize, DataTypes) => {
	return Sequelize.define("user", {
		id: {
			type: DataTypes.UUID,
			defaultValue: DataTypes.UUIDV4,
			primaryKey: true
		},
		name: {
			type: DataTypes.STRING,
			allowNull: false,
			validate: {
				isAlphanumeric: {
					args: true,
					msg: "Username can only contain letters and numbers"
				},
				len: {
					args: [3, 15],
					msg: "Username must be 3-15 characters long."
				}
			}
		},
		username: {
			type: DataTypes.STRING,
			allowNull: false,
			unique: true
		},
		password: {
			type: DataTypes.STRING,
			allowNull: false
		},
		email: {
			type: DataTypes.STRING,
			allowNull: false,
			unique: true,
			isEmail: true
		},
		profilePicUrl: {
			type: DataTypes.STRING,
			isUrl: true,
			allowNull: true
		}
	});
};
