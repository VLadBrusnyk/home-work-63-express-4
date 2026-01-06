const express = require('express');
const checkArticleAccess = require('../middlewares/checkArticleAccess');
const { listArticles, getArticle, createArticle } = require('../controllers/articlesController');

const router = express.Router();

router.use(checkArticleAccess);

router.get('/', listArticles);
router.get('/:articleId', getArticle);
router.post('/', createArticle);

module.exports = router;
