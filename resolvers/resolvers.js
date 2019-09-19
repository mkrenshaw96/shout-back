const bcrypt = require('bcryptjs');
const { tryLogin } = require('../auth');
const requiresAuth = require('../permissions');
module.exports = {
	Query: {
		getSingleUser: (parent, args, { db }) => db.USER.findOne({ where: args }),
		allUsers: (parent, args, { db }) => db.USER.findAll(),
		getAllPosts: function(parent, args, { db }) {
			db.POST.findAll();
		},
		getMyFeed: async function(parent, args, { db, req }) {
			try {
				const imFollowing = await db.FOLLOW.findAll({ where: { userId: req.user } });
				const imFollowingUserIds = imFollowing.map(user => user.followingUserId);
				const feed = await db.POST.findAll({
					where: {
						userId: imFollowingUserIds
					},
					include: {
						model: db.USER
					},
					order: [['createdAt', 'DESC']]
					// limit: 100
				});
				return {
					ok: true,
					post: feed
				};
			} catch (err) {
				return {
					ok: false,
					errors: err
				};
			}
		},
		allFollow: async (parent, args, { db, req }) => db.FOLLOW.findAll()
	},
	Mutation: {
		//CREATE A POST AND ADD THE USERS ID
		createPost: requiresAuth.createResolver(async function(parent, args, { db, req }) {
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
		}),
		// uploadProfileImg: requiresAuth.createResolver(async function(parent, args, { db, req }) {
		// 	try {
		// 		const user = await db.USER.findOne({ args }).then(foundUser => {
		// 			foundUser
		// 				.update(
		// 					{
		// 						profilePicUrl: 'testing'
		// 					},
		// 					{ returning: true }
		// 				)
		// 				.then(updated => {
		// 					return updated.dataValues;
		// 				});
		// 		});
		// 	} catch (err) {
		// 		console.log(err);
		// 		// return {
		// 		// 	ok: false,
		// 		// 	errors: err
		// 		// };
		// 	}
		// }),

		//CREATE A NEW USER AND ENCRYPT THE PASSWORD
		createUser: async function(parent, args, { db }) {
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

		//LOGIN A USER WITH USERNAME AND PASSWORD
		loginUser: async function(parent, { username, password }, { db, secret, secret2 }) {
			return tryLogin(username, password, db, secret, secret2);
		},
		followUser: async function(parent, { them, me }, { db, req }) {
			return await db.FOLLOW.create({ followingUserId: them, userId: me });
		}
	}
};
