'use strict';
import "reflect-metadata";
import { useExpressServer } from "routing-controllers";
import { connect } from './src/databases/mongodb'
const express = require('express');
const Config = require('conf');
require('./src/libs/agenda.lib');

module.exports = {
	run: function () {
		const settings = new Config({
			configName: process.env.NODEJS_DENGA_CONFIGNAME
		});
		connect(settings.get('db'), {
			useNewUrlParser: true,
			useUnifiedTopology: true
		});
		const app = express();
		app.use('/', express.static(__dirname + '/public', { redirect: false }));
		
		useExpressServer(app, {
			cors: true,
			routePrefix: "/api",
			controllers: [__dirname + "/src/controllers/*.js"],
			errorOverridingMap: {
				AuthorizationRequiredError: { stack: undefined } // hide error stack
			}
		})

		app.listen(process.env.PORT || settings.get('port'));
		console.log('Denga started...  URL : http://localhost:' + settings.get('port'));
		console.log('Press Ctrl+C to quit.');
	}
}