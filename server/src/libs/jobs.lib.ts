import { JobsDB } from '../databases/mongodb';
const Config = require('conf');
const settings = new Config();
export class JobsLib {

    async getAll(){        
        try {
            let res = await JobsDB().find({}).limit(settings.get('limit')).toArray()
            res = res.map(c => {
                c._id = c._id.toString()
                return c
            })
            return res           
        } catch (error) {            
            throw error;
        }    
    }

}
