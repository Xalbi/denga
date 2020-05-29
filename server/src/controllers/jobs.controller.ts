import { JsonController, Get} from "routing-controllers";
import { JobsLib } from "../libs/jobs.lib";
 
@JsonController('/jobs')

export class CompanyController {
    jobsLib = new JobsLib();

    @Get("/all")
    async getAll() {
        return await this.jobsLib.getAll()
    }
}