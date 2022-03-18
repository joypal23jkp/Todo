require('dotenv').config();
const app = require('./app');
const dotenv = require('dotenv');

dotenv.config({
    path: '.env'
});

const port = process.env.PORT;
require('./init-db')

process.on('uncaughtException', err => {
    console.log('UNCAUGHT EXCEPTION!!! shutting down...');
    console.log(err.name, err.message);
    process.exit(1);
});

// Start the server
app.listen(port);

process.on('unhandledRejection', err => {
    console.log('UNHANDLED REJECTION!!!  shutting down ...');
    console.log(err.name, err.message);
    // handle Rejection with rollbar
});
