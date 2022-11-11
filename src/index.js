const express = require('express');
const userRouter = require('./routers/user');
const taskRouter = require('./routers/task');
const connectDB = require('./db/mongoose');

const app = express();
const port = process.env.PORT || 3000;

/**
 * Initialize DB
 */
connectDB();

/**
 * Apply middlewares
 */
app.use(express.json());

/**
 * Routes
 */
app.use(userRouter);
app.use(taskRouter);

/**
 * Server initialization
 */
app.listen(port, () => {
    console.log(`Server is up on port ${port}`);
});
