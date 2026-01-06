function apiAuth(req, res, next) {
    const authHeader = req.headers['authorization'];
    if (!authHeader) {
        return res.status(401).json({ error: 'Access denied. Provide Authorization header.' });
    }
    next();
}

module.exports = apiAuth;
