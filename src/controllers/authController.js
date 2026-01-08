const jwt = require('jsonwebtoken');
const { createUser, getUserById, getUserByUsername, verifyCredentials } = require('../data/usersStore');
const { JWT_SECRET, authCookieOptions } = require('../config');

const TOKEN_COOKIE = 'auth_token';

function signToken(user) {
    return jwt.sign({ id: user.id, username: user.username, email: user.email }, JWT_SECRET, {
        expiresIn: '1h',
    });
}

function setAuthCookie(res, token) {
    res.cookie(TOKEN_COOKIE, token, authCookieOptions);
}

function register(req, res) {
    const { username, email, password } = req.body || {};
    if (!username || !email || !password) {
        return res.status(400).json({ error: 'username, email and password are required' });
    }
    if (getUserByUsername(username)) {
        return res.status(409).json({ error: 'User with this username already exists' });
    }

    const user = createUser({ username, email, password });
    const token = signToken(user);
    setAuthCookie(res, token);

    return res.status(201).json({
        user: { id: user.id, username: user.username, email: user.email },
        token,
        message: 'User registered and logged in',
    });
}

function login(req, res) {
    const { username, password } = req.body || {};
    if (!username || !password) {
        return res.status(400).json({ error: 'username and password are required' });
    }

    const user = verifyCredentials(username, password);
    if (!user) {
        return res.status(401).json({ error: 'Invalid credentials' });
    }

    const token = signToken(user);
    setAuthCookie(res, token);

    return res.json({
        user: { id: user.id, username: user.username, email: user.email },
        token,
        message: 'Login successful',
    });
}

function me(req, res) {
    const user = getUserById(req.user.id);
    return res.json({ user: user ? { id: user.id, username: user.username, email: user.email } : req.user });
}

function logout(req, res) {
    res.clearCookie(TOKEN_COOKIE, {
        httpOnly: authCookieOptions.httpOnly,
        sameSite: authCookieOptions.sameSite,
        secure: authCookieOptions.secure,
    });
    return res.json({ message: 'Logged out' });
}

module.exports = { register, login, me, logout };
