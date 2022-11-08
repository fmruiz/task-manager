const express = require('express');
const router = express.Router();
/**
 * Models
 */
const User = require('../models/user');

router.get('/users', async (req, res) => {
    try {
        const users = await User.find({});
        res.send(users);
    } catch (error) {
        console.log(`Error ==> ${error}`);
        res.status(500).send(error);
    }
});

router.get('/users/:id', async (req, res) => {
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

router.post('/users', async (req, res) => {
    const user = new User(req.body);

    try {
        await user.save();
        res.send(user);
    } catch (error) {
        console.log(`Error ==> ${error}`);
        res.status(400).send(error);
    }
});

router.patch('/users/:id', async (req, res) => {
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
        const userUpdated = await User.findByIdAndUpdate(id, req.body, {
            new: true,
            runValidators: true,
        });

        if (!userUpdated) {
            return res
                .status(404)
                .send({ message: 'User not found!', status: 404 });
        }

        res.send(userUpdated);
    } catch (error) {
        console.log(`Error ==> ${error}`);
        res.status(400).send(error);
    }
});

router.delete('/users/:id', async (req, res) => {
    const { id } = req.params;

    try {
        const userDeleted = await User.findByIdAndDelete(id);

        if (!userDeleted) {
            return res
                .status(404)
                .send({ message: 'User not found!', status: 404 });
        }

        res.send(userDeleted);
    } catch (error) {
        console.log(`Error ==> ${error}`);
        res.status(500).send(error);
    }
});

module.exports = router;
