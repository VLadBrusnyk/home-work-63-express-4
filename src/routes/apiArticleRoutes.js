const express = require('express');
const apiCheckArticleAccess = require('../middlewares/apiCheckArticleAccess');
const {
    apiListArticles,
    apiGetArticle,
    apiCreateArticle,
    apiReplaceArticle,
    apiPatchArticle,
    apiDeleteArticle,
} = require('../controllers/apiArticlesController');

const router = express.Router();

router.use(apiCheckArticleAccess);

router.get('/', apiListArticles);
router.get('/:articleId', apiGetArticle);
router.post('/', apiCreateArticle);
router.put('/:articleId', apiReplaceArticle);
router.patch('/:articleId', apiPatchArticle);
router.delete('/:articleId', apiDeleteArticle);

module.exports = router;
