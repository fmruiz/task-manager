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

app.get('/users', (req, res) => {
    User.find({})
        .then((users) => {
            res.send(users);
        })
        .catch((error) => {
            console.log(`Error ==> ${error}`);
            res.status(500).send(error);
        });
});

app.get('/users/:id', (req, res) => {
    const { id } = req.params;

    User.findById(id)
        .then((user) => {
            if (!user) {
                return res
                    .status(404)
                    .send({ message: 'User not found!', status: 404 });
            }

            res.send(user);
        })
        .catch((error) => {
            console.log(`Error ==> ${error}`);
            res.status(500).send(error);
        });
});

app.post('/users', (req, res) => {
    const user = new User(req.body);

    user.save()
        .then(() => {
            res.send(user);
        })
        .catch((error) => {
            console.log(`Error ==> ${error}`);
            res.status(400).send(error);
        });
});

app.get('/tasks', (req, res) => {
    Task.find({})
        .then((tasks) => {
            res.send(tasks);
        })
        .catch((error) => {
            console.log(`Error ==> ${error}`);
            res.status(500).send(error);
        });
});

app.get('/tasks/:id', (req, res) => {
    const { id } = req.params;

    Task.findById(id)
        .then((task) => {
            if (!task) {
                return res
                    .status(404)
                    .send({ message: 'Task not found!', status: 404 });
            }

            res.send(task);
        })
        .catch((error) => {
            console.log(`Error ==> ${error}`);
            res.status(500).send(error);
        });
});

app.post('/tasks', (req, res) => {
    const tasks = new Task(req.body);

    tasks
        .save()
        .then(() => {
            res.send(tasks);
        })
        .catch((error) => {
            console.log(`Error ==> ${error}`);
            res.status(400).send(error);
        });
});

/**
 * Server initialization
 */
app.listen(port, () => {
    console.log(`Server is up on port ${port}`);
});
