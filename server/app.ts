'use strict';
require('./src/libs/agenda.lib');
const express = require('express');

import "reflect-metadata";
import {useExpressServer} from "routing-controllers";
import {connect} from './src/databases/mongodb'
import * as get_settings from './src/get_settings';

const settings = get_settings.json()
connect(settings.mongodb.url, {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

const app = express();
useExpressServer(app, {
    cors: true,
    routePrefix: "/api",
    controllers: [ __dirname + "/src/controllers/*.js"],
    errorOverridingMap: {
        AuthorizationRequiredError: { stack: undefined } // hide error stack
    }
})

app.use('/', express.static(__dirname + '/public', { redirect: false }));
app.get('*',(req,res) =>{
    return res.sendFile(__dirname + '/public/index.html');
});

app.listen(process.env.PORT || settings.port);

console.log('Denga listening on port: ', settings.port);
console.log('Production mode: ', settings.prod);
console.log('Press Ctrl+C to quit.');
