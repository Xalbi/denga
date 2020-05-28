import * as get_settings from '../get_settings';
const settings = get_settings.json()
const Agenda = require('agenda');
const connectionOpts = {
    db: {
        address: settings.mongodb.url,
        collection: 'agenda_jobs',
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

if (settings.agenda.on) {
    console.log('agenda is up!');
    agenda.start();
}
})
module.exports = agenda;