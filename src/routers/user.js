const express = require('express');
const router = express.Router();

/**
 * Controllers
 */
const {
    getUsers,
    getUsersById,
    createUser,
    updateUserById,
    deleteUserById,
    loginUser,
} = require('../controllers/userController');

/**
 * Routes
 */
router.get('/users', getUsers);

router.get('/users/:id', getUsersById);

router.post('/users', createUser);

router.post('/users/login', loginUser);

router.patch('/users/:id', updateUserById);

router.delete('/users/:id', deleteUserById);

module.exports = router;
