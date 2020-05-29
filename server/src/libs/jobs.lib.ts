import { JobsDB } from '../databases/mongodb';

export class JobsLib {

    async getAll(){        
        try {
            let res = await JobsDB().find({}).toArray()
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
