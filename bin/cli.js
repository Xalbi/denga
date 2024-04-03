#!/usr/bin/env node

const meow = require('meow');
const Config = require('conf');

const requiredVersion = "10.15.0"; // Example required version

// Check if the installed version meets the requirements
if (parseFloat(process.version.slice(1)) < parseFloat(requiredVersion)) {
    console.log(`You need to upgrade Node.js to version ${requiredVersion} or higher.`);
    console.log(`Installed version: ${process.version}`);
	process.exit()
} else {
    console.log(`Your Node.js version ${process.version} meets the requirements.`);
    // Your application code goes here
}

const cli = meow(`
	Usage
	  $ denga --db mongodb://127.0.0.1:27017/denga 

	Options
	  --db, -d	(required) connection URI used to connect to a MongoDB
	  --port, -p	(optional) server port, default 3000
	  --collection, -c	(optional) Mongo collection, same as Agenda collection name, default agendaJobs
	  --limit, -l	(optional) max number of jobs displayed, default 100
	  --title, -t	(optional) page title, default Denga
	  --keys, -k	(optional) (multiple) keys to include in search, you can use dot-notation (.) in a key to access nested properties

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

let configName = 'denga-' + cli.flags.port
process.env['NODEJS_DENGA_CONFIGNAME'] = configName;
const settings = new Config({
	configName: configName
});
settings.set(cli.flags);

const myapp = require('../server/app');
myapp.run(cli.flags)