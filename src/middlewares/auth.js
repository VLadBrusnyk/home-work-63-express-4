function auth(req, res, next) {
    if (req.method === 'GET') {
        return next();
    }
    const authHeader = req.headers['authorization'];
    if (!authHeader) {
        return res.status(401).send('Access denied. Provide Authorization header.');
    }
    next();
}

module.exports = auth;
