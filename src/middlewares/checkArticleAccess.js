function checkArticleAccess(req, res, next) {
    if (req.method === 'GET') {
        return next();
    }
    const role = req.headers['x-article-role'];
    if (role !== 'editor') {
        return res.status(403).send('Access to articles is restricted.');
    }
    next();
}

module.exports = checkArticleAccess;
