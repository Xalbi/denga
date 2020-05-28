'use strict';
require('./src/libs/agenda.lib');
const express = require('express');

import "reflect-metadata";
import {createExpressServer, useExpressServer} from "routing-controllers";
import {connect} from './src/databases/mongodb'
import * as get_settings from './src/get_settings';

const settings = get_settings.json()
connect(settings.mongodb.url, {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

const app = express();
useExpressServer(app, {
// const app = createExpressServer({
    cors: true,
    routePrefix: "/api",
    controllers: [ __dirname + "/src/controllers/*.js"],
    errorOverridingMap: {
        AuthorizationRequiredError: { stack: undefined } // hide error stack
    }
})
console.log(__dirname + '/public');

app.use('/', express.static(__dirname + '/public'));

app.listen(process.env.PORT || settings.port);

console.log('octopoda listening on port: ', settings.port);
console.log('Production mode: ', settings.prod);
console.log('Press Ctrl+C to quit.');
