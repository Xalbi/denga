import { JsonController, Get, Post, Body} from "routing-controllers";
import { JobsLib } from "../libs/jobs.lib";
import { Filter } from "../models/filter";
 
@JsonController('/jobs')

export class CompanyController {
    jobsLib = new JobsLib();

    /**
    TODO:
    make sure that the user filter will be used after any query
    after a delete or q requeue we must get the new list filtred
     */

    @Post("/all")
    async getAll(@Body() filter: Filter) {
        return await this.jobsLib.getAll(filter)
    }
   
    @Post("/remove")
    async remove(@Body() body: any) {
        return await this.jobsLib.remove(body)
    }

    @Post("/filter_remove")
    async removeByFilter(@Body() body: any) {
        return await this.jobsLib.removeByFilter(body)
    }

    @Post("/requeue")
    async requeue(@Body() body: any) {
        return await this.jobsLib.requeue(body)
    }
}