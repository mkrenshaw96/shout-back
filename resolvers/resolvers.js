const bcrypt = require('bcryptjs');
const tryLogin = require('./ResFunctions/auth');

module.exports = {
    Query: {
        //USERS
        getSingleUser: (parent, args, { db }) => db.USER.findOne({ where: args }),
        allUsers: (parent, args, { db }) => db.USER.findAll(),

        //POSTS
        getAllPosts: (parent, args, { db }) => db.POST.findAll()
    },
    Mutation: {
        //USERS
        createUser: async (parent, args, { db }) => {
            try {
                const user = await db.USER.create({ ...args, password: bcrypt.hashSync(args.password) })
                return {
                    ok: true,
                    user
                }
            } catch (err) {
                return {
                    ok: false,
                    errors: err
                }
            }
        },
        createPost: async (parent, args, { db, user }) => {
            try {
                return await db.POST.create({ ...args, userId: user.userId })
            } catch (err) {
                return err
            }
        },
        // loginUser: async function (parent, args, { db }) {
        //     try {
        //         const user = db.USER.findOne({
        //             where: {
        //                 username: args.username
        //             }
        //         })
        //         return {
        //             ok: true,
        //             user
        //         }
        //     } catch (err) {
        //         return {
        //             ok: false,
        //             error: err
        //         }
        //     }
        // },
        loginUser: async function (parent, { username, password }, { db, secret, secret2 }) {
            return tryLogin(username, password, db, secret, secret2)
        }
    }
};