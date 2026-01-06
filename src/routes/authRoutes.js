const express = require('express');
const { register, login, me, logout } = require('../controllers/authController');
const jwtAuth = require('../middlewares/jwtAuth');

const router = express.Router();

router.post('/register', register);
router.post('/login', login);
router.get('/me', jwtAuth, me);
router.post('/logout', logout);

module.exports = router;
