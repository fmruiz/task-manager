const mongoose = require('mongoose');

const connectionURL = 'mongodb://127.0.0.1:27017/task-manager-api';

mongoose.connect(connectionURL, {
    useNewUrlParser: true,
});

const User = mongoose.model('User', {
    name: {
        type: String,
    },
    age: {
        type: Number,
    },
});

const Task = mongoose.model('Task', {
    description: {
        type: String,
    },
    completed: {
        type: Boolean,
    },
});
