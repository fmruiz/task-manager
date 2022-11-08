const express = require('express');
const router = express.Router();
/**
 * Models
 */
const Task = require('../models/task');

router.get('/tasks', async (req, res) => {
    try {
        const tasks = await Task.find({});
        res.send(tasks);
    } catch (error) {
        console.log(`Error ==> ${error}`);
        res.status(500).send(error);
    }
});

router.get('/tasks/:id', async (req, res) => {
    const { id } = req.params;

    try {
        const task = await Task.findById(id);

        if (!task) {
            return res
                .status(404)
                .send({ message: 'Task not found!', status: 404 });
        }

        res.send(task);
    } catch (error) {
        console.log(`Error ==> ${error}`);
        res.status(500).send(error);
    }
});

router.post('/tasks', async (req, res) => {
    const tasks = new Task(req.body);

    try {
        await tasks.save();
        res.send(tasks);
    } catch (error) {
        console.log(`Error ==> ${error}`);
        res.status(400).send(error);
    }
});

router.patch('/tasks/:id', async (req, res) => {
    const { id } = req.params;

    const updates = Object.keys(req.body);
    const allowedUpdates = ['description', 'completed'];
    const isValidOperation = updates.every((x) => allowedUpdates.includes(x));

    if (!isValidOperation) {
        return res.status(400).send({
            message: 'Invalid operation! Please check yours fields',
            status: 400,
        });
    }

    try {
        const taskUpdated = await Task.findByIdAndUpdate(id, req.body, {
            new: true,
            runValidators: true,
        });

        if (!taskUpdated) {
            return res
                .status(404)
                .send({ message: 'Task not found!', status: 404 });
        }

        res.send(taskUpdated);
    } catch (error) {
        console.log(`Error ==> ${error}`);
        res.status(500).send(error);
    }
});

router.delete('/tasks/:id', async (req, res) => {
    const { id } = req.params;

    try {
        const taskDeleted = await Task.findByIdAndDelete(id);

        if (!taskDeleted) {
            return res
                .status(404)
                .send({ message: 'Task not found!', status: 404 });
        }

        res.send(taskDeleted);
    } catch (error) {
        console.log(`Error ==> ${error}`);
        res.status(500).send(error);
    }
});

module.exports = router;
