require('dotenv').config();
const app = require('./app');
require("./init-db")

const port = process.env.PORT;

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
