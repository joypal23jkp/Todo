const express = require("express");
const helmet = require("helmet");
const mongoSanitize = require("express-mongo-sanitize");
const xss = require("xss-clean");
const hpp = require("hpp");
const cors = require("cors");

const routes = require("./src/routes/index.js");
const globalErrorHandler = require("./src/exceptions/Handler");
const AppError = require("./src/exceptions/AppError");

class App {
    constructor(app) {
        this.app = app;
        app.use(cors());
        app.use(helmet());
        //
        app.use(express.json({
            limit: '15kb'
        }));
        //
        app.use(mongoSanitize());
        app.use(xss());
        app.use(hpp());
        //
        // // Routes prefix
        app.use('api/v1', routes);
        //
        // // handle undefined Routes
        app.use('*', (req, res, next) => {
            const err = new AppError(404, 'fail', 'undefined route');
            next(err, req, res, next);
        });
        //
        app.use(globalErrorHandler);
    }

    listen(port){
        console.log(port)
        this.app.listen(port, () => console.log(`Application is running on port ${port}`));
    }
}

module.exports = new App(express());
