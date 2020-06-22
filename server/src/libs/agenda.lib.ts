
const Config = require('conf');
const settings = new Config({
    configName: process.env.NODEJS_DENGA_CONFIGNAME
});

const Agenda = require('agenda');
const connectionOpts = {
    db: {
        address: settings.get('db'),
        collection: settings.get('collection'),
        options: {
            useUnifiedTopology: true,
            autoReconnect: false,
            reconnectInterval: false,
            reconnectTries: false
        }
    }
};

const agenda = new Agenda(connectionOpts);
agenda.on('ready', function() {
    console.log('Agenda is up!');
    agenda.start();
})
module.exports = agenda;