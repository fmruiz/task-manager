const express = require('express');
const router = express.Router();

/**
 * Controllers
 */
const {
    getTasks,
    getTaskById,
    createTask,
    updateTaskById,
    deleteTaskById,
} = require('../controllers/taskController');

/**
 * Routes
 */
router.get('/tasks', getTasks);

router.get('/tasks/:id', getTaskById);

router.post('/tasks', createTask);

router.patch('/tasks/:id', updateTaskById);

router.delete('/tasks/:id', deleteTaskById);

module.exports = router;
