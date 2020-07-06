import { JsonController, Get, InternalServerError } from "routing-controllers";
import { StatsOverviewLib } from "../libs/stats-overview.lib";
 
@JsonController('/stats')

export class StatsOverviewController {
    statsOverviewLib = new StatsOverviewLib();

    @Get("/")
    async getTotalStats() {
        try {
            return await this.statsOverviewLib.getAll()
        }catch(error){
            throw new InternalServerError(error);
        } 
    }
}   