const bcrypt = require('bcryptjs');
const { tryLogin } = require('../auth');

module.exports = {
	Query: {
		getSingleUser: (parent, args, { db }) => db.USER.findOne({ where: args }),
		allUsers: (parent, args, { db }) => db.USER.findAll(),
		getAllPosts: (parent, args, { db }) => db.POST.findAll()
	},
	Mutation: {
		createUser: async (parent, args, { db }) => {
			try {
				const user = await db.USER.create({ ...args, password: bcrypt.hashSync(args.password) });
				return {
					ok: true,
					user
				};
			} catch (err) {
				return {
					ok: false,
					errors: err
				};
			}
		},
		createPost: async (parent, args, { db, req }) => {
			try {
				const post = await db.POST.create({ ...args, userId: req.user });
				return {
					ok: true,
					post
				};
			} catch (err) {
				return {
					ok: false,
					errors: err
				};
			}
		},
		loginUser: async function(parent, { username, password }, { db, secret, secret2 }) {
			return tryLogin(username, password, db, secret, secret2);
		}
	}
};
