const express = require('express');
const apiAuth = require('../middlewares/apiAuth');
const validateUserData = require('../middlewares/validateUserData');
const {
    apiListUsers,
    apiGetUser,
    apiCreateUser,
    apiReplaceUser,
    apiPatchUser,
    apiDeleteUser,
} = require('../controllers/apiUsersController');

const router = express.Router();

router.use(apiAuth);
router.use(validateUserData);

router.get('/', apiListUsers);
router.get('/:userId', apiGetUser);
router.post('/', apiCreateUser);
router.put('/:userId', apiReplaceUser);
router.patch('/:userId', apiPatchUser);
router.delete('/:userId', apiDeleteUser);

module.exports = router;
