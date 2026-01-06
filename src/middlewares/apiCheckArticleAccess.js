function apiCheckArticleAccess(req, res, next) {
    const role = req.headers['x-article-role'];
    if (role !== 'editor') {
        return res.status(403).json({ error: 'Access to articles is restricted.' });
    }
    next();
}

module.exports = apiCheckArticleAccess;
