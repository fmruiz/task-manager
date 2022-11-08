const express = require('express');
const Task = require('./models/task');
const User = require('./models/user');

/**
 * Initialize DB
 */
require('./db/mongoose');

const app = express();
const port = process.env.PORT || 3000;

/**
 * Apply middlewares
 */
app.use(express.json());

app.get('/users', async (req, res) => {
    try {
        const users = await User.find({});
        res.send(users);
    } catch (error) {
        console.log(`Error ==> ${error}`);
        res.status(500).send(error);
    }
});

app.get('/users/:id', async (req, res) => {
    const { id } = req.params;

    try {
        const user = await User.findById(id);

        if (!user) {
            return res
                .status(404)
                .send({ message: 'User not found!', status: 404 });
        }

        res.send(user);
    } catch (error) {
        console.log(`Error ==> ${error}`);
        res.status(500).send(error);
    }
});

app.post('/users', async (req, res) => {
    const user = new User(req.body);

    try {
        await user.save();
        res.send(user);
    } catch (error) {
        console.log(`Error ==> ${error}`);
        res.status(400).send(error);
    }
});

app.patch('/users/:id', async (req, res) => {
    const { id } = req.params;

    const updates = Object.keys(req.body);
    const allowedUpdates = ['name', 'email', 'password', 'age'];
    const isValidOperation = updates.every((x) => allowedUpdates.includes(x));

    if (!isValidOperation) {
        return res.status(400).send({
            message: 'Invalid operation! Please check yours fields',
            status: 400,
        });
    }

    try {
        const user = await User.findByIdAndUpdate(id, req.body, {
            new: true,
            runValidators: true,
        });

        if (!user) {
            return res
                .status(404)
                .send({ message: 'User not found!', status: 404 });
        }

        res.send(user);
    } catch (error) {
        console.log(`Error ==> ${error}`);
        res.status(400).send(error);
    }
});

app.get('/tasks', async (req, res) => {
    try {
        const tasks = await Task.find({});
        res.send(tasks);
    } catch (error) {
        console.log(`Error ==> ${error}`);
        res.status(500).send(error);
    }
});

app.get('/tasks/:id', async (req, res) => {
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

app.post('/tasks', async (req, res) => {
    const tasks = new Task(req.body);

    try {
        await tasks.save();
        res.send(tasks);
    } catch (error) {
        console.log(`Error ==> ${error}`);
        res.status(400).send(error);
    }
});

app.patch('/tasks/:id', async (req, res) => {
    const { id } = req.params;

    const updates = Object.keys(req.body);
    const allowedUpdates = ['description', 'completed'];
    const isValidOperation = updates.every((x) => allowedUpdates.includes(x));

    if (!isValidOperation) {
        return res
            .status(400)
            .send({
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

/**
 * Server initialization
 */
app.listen(port, () => {
    console.log(`Server is up on port ${port}`);
});
