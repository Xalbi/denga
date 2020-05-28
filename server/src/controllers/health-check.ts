import { JsonController, Get } from "routing-controllers";

@JsonController('/health')
export class HealthCheckController {
    @Get("/")
    async check() {        
        return {"status": 1}
    }

}