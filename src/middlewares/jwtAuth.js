const jwt = require('jsonwebtoken');
const { JWT_SECRET } = require('../config');

function extractToken(req) {
    const bearer = req.headers.authorization;
    if (bearer && bearer.toLowerCase().startsWith('bearer ')) {
        return bearer.slice(7).trim();
    }
    return req.cookies?.auth_token;
}

function jwtAuth(req, res, next) {
    const token = extractToken(req);
    if (!token) {
        return res.status(401).json({ error: 'Missing JWT. Please login.' });
    }

    try {
        req.user = jwt.verify(token, JWT_SECRET);
        return next();
    } catch (err) {
        return res.status(401).json({ error: 'Invalid or expired token.' });
    }
}

module.exports = jwtAuth;
