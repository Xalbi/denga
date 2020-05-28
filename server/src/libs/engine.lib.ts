import * as get_settings from '../get_settings';
const settings = get_settings.json()
const agenda = require('./agenda.lib');

export class EngineLib {

    async runJob(body) {
        agenda.now(body.job, { data: "am testing the concept" })
        return []
    }

    async scheduleJob(body) {
        let x = await agenda.cancel({  
            "data.id": body.id,
            "name": body.job
        });
        console.log('override [ ', body.id + ' ]: ' + x);
        let jobData = { id: body.id, params: body.params };
        let job = agenda.create(body.job, jobData);
        job.schedule('now');
        job.repeatEvery(body.every).save();
        return body
    }

}
