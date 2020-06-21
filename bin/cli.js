#!/usr/bin/env node

const meow = require('meow');
const Config = require('conf');
const settings = new Config();
const myapp = require('../server/app');

const cli = meow(`
	Usage
	  $ denga --db mongodb://127.0.0.1:27017/denga 

	Options
	  --db, -d	(required) connection URI used to connect to a MongoDB
	  --port, -p	(optional) server port, default 3000
	  --collection, -c	(optional) Mongo collection, same as Agenda collection name, default agendaJobs
	  --limit, -l	(optional) max number of jobs displayed, default 100
	  --title, -t	(optional) page title, default Denga
	  --keys, -k	(optional) (multiple) keys to include in search

	Examples
	  $ denga -p 3010 -c jobs -t myDashBoard --limit=300 -d mongodb://127.0.0.1:27017/denga 
`, {
	booleanDefault: undefined,
	description: 'Denga: a new dashboard for Agenda',
	flags: {
		port: {
			type: 'number',
			default: 3000,
			alias: 'p'
		},
		db: {
			type: 'string',
			alias: 'd',
			isRequired: true
		},
		collection: {
			type: 'string',
			default: 'agendaJobs',
			alias: 'c'
		},
		limit: {
			type: 'number',
			default: 100,
			alias: 'l'
		},
		title: {
			type: 'string',
			default: 'Denga',
			alias: 't'
		},
		keys: {
			type: 'string',
			alias: 'k',
			default: [],
			isMultiple: true
		}
	}
});

settings.set(cli.flags);
myapp.run()