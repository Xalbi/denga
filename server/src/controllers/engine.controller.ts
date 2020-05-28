import { JsonController, Get, Post, Body } from "routing-controllers";
import { EngineLib } from "../libs/engine.lib";

@JsonController('/engine')
export class EngineController {
    engine = new EngineLib();
    
    @Post("/run")
    async runJob(@Body() body: any) {
        console.log("recieved new job query: ", body.job );
        
        await this.engine.runJob(body)
        return { 
            job: body.job,
            status : 'started'
        }
    }

    @Post("/schedule")
    async scheduleJob(@Body() body: any) {
        console.log("recieved new job query: ", body.job + ' [ ' + body.id + ' ]');
        let s = await this.engine.scheduleJob(body)
        return { 
            obj: s,
            status : 'scheduled'
        }
    }
}