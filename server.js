#!/bin/env node
 //  OpenShift sample Node application
var express = require('express');

var fs = require('fs');
var path = require('path');

var webpack = require('webpack');

var configDev = require('./webpack.config.js');
var configProd = require('./webpack.production.config.js');

/**
 *  Define the sample application.
 */
var App = function() {

    //  Scope.
    var self = this;

    /*  ================================================================  */
    /*  Helper functions.                                                 */
    /*  ================================================================  */

    /**
     *  Set up server IP address and port # using env variables/defaults.
     */
    self.setupVariables = function() {
        //  Set the environment variables we need.
        self.ipaddress = process.env.OPENSHIFT_NODEJS_IP;
        self.port = process.env.OPENSHIFT_NODEJS_PORT || 8080;
        process.env.NODE_ENV = 'prodaction';

        if (typeof self.ipaddress === "undefined") {
            //  Log errors on OpenShift but continue w/ 127.0.0.1 - this
            //  allows us to run/test the app locally.
            self.ipaddress = "localhost";
            self.port = 9080;
            process.env.NODE_ENV = 'development';
        }
    };
    /**
     *  terminator === the termination handler
     *  Terminate server on receipt of the specified signal.
     *  @param {string} sig  Signal to terminate on.
     */
    self.terminator = function(sig) {
        if (typeof sig === 'string') {
            console.log('\rPoetic stoped ...', 'Signal - ', sig);
            //выход в консоли из node
            process.exit(1);
        }
        console.log('%s: Node server stopped.', Date(Date.now()));
    };
    /**
     *  Setup termination handlers (for exit and a list of signals).
     */
    self.setupTerminationHandlers = function() {
        //слушает событие exit
        //  Process on exit and signals.
        process.on('exit', function() {
            self.terminator();
        });
        //бинд для выключения сервера через консоль
        // Removed 'SIGPIPE' from the list - bugz 852598.
        ['SIGHUP', 'SIGINT', 'SIGQUIT', 'SIGILL', 'SIGTRAP', 'SIGABRT',
            'SIGBUS', 'SIGFPE', 'SIGUSR1', 'SIGSEGV', 'SIGUSR2', 'SIGTERM'
        ].forEach(function(element, index, array) {
            process.on(element, function() {
                self.terminator(element);
            });
        });
    };
    /*  ================================================================  */
    /*  App server functions (main app logic here).                       */
    /*  ================================================================  */

    /**
     *  Create the routing table entries + handlers for the application.
     */
    self.createRoutes = function() {

        self.routes = {};

        self.routes['/'] = function(req, res) {
            res.sendFile(path.join(__dirname, '/public/index.html'));
        };
    };
    /**
     *  Initialize the server (express) and create the routes and register
     *  the handlers.
     */
    self.initializeServer = function() {

        self.createRoutes();
        self.app = express();

        self.app.use(express.static(path.join(__dirname,  '/public')));

        //  Add handlers for the app (from the routes).
        for (var r in self.routes) {
            self.app.get(r, self.routes[r]);
        }
    };


    /**
     *  Initializes the sample application.
     */
    self.initialize = function() {
        self.setupVariables();
        self.setupTerminationHandlers();
        // Create the express server and routes.
        self.initializeServer();

        var compiler;

        if (process.env.NODE_ENV === 'prodaction') {
            compiler= webpack(configProd);
            compiler.run();
        } else {
            compiler= webpack(configDev);

            compiler.watch({ // watch options:
                aggregateTimeout: 300, // wait so long for more changes
                poll: true // use polling instead of native watchers
            }, function(err, stats) {
                console.log('Webpack watching!');
            });
        }
    };
    /**
     *  Start the server (starts up the sample application).
     */
    self.start = function() {
        //  Start the app on the specific interface (and port).
        self.app.listen(self.port, self.ipaddress, function() {
            console.log('%s: Node server started on %s:%d ...',
                Date(Date.now()), self.ipaddress, self.port);
        });
    };

}; /*  Sample Application.  */

/**
 *  main():  Main code.
 */
var poeticPraxis = new App();

poeticPraxis.initialize();
poeticPraxis.start();