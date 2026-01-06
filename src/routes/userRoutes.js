const express = require('express');
const auth = require('../middlewares/auth');
const validateUserData = require('../middlewares/validateUserData');
const { listUsers, getUser, createUser } = require('../controllers/usersController');

const router = express.Router();

router.use(auth);
router.use(validateUserData);

router.get('/', listUsers);
router.get('/:userId', getUser);
router.post('/', createUser);

module.exports = router;
