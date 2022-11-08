const mongoose = require('mongoose');

const connectionURL = 'mongodb://127.0.0.1:27017/task-manager-api';

/**
 * Mongoose connection
 */
const connectDB = async () => {
    try {
        await mongoose.connect(connectionURL, {
            useNewUrlParser: true,
        });

        console.log(`Database connection OK`);
    } catch (error) {
        console.log(`Error to connect with database ==> ${error}`);
    }
};

module.exports = connectDB;
