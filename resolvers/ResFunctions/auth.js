const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

const createTokens = async (user, secret, secret2) => {
    const createToken = await jwt.sign({ user: user.id }, secret, { expiresIn: '20m' });
    const refreshToken = await jwt.sign({ user: user.id }, secret2, { expiresIn: '7d' });
    return [createToken, refreshToken];
};

const tryLogin = async (username, password, db, secret, secret2) => {
    const user = await db.USER.findOne({
        where: {
            username
        }
    });
    if (!user) {
        return {
            ok: false,
            errors: [{ path: 'username', message: 'Username is not valid.' }]
        }
    }
    const valid = await bcrypt.compare(password, user.password);
    if (!valid) {
        return {
            ok: false,
            errors: [{ path: 'password', message: 'Password is not valid.' }]
        }
    }

    const refreshTokenSecret = user.password + secret2;

    const [token, refreshToken] = await createTokens(user, secret, refreshTokenSecret);
    return {
        ok: true,
        user,
        token,
        refreshToken
    }
}

module.exports = tryLogin;