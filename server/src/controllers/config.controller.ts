import { JsonController, Get } from "routing-controllers";
const Config = require('conf');
const settings = new Config({
	configName: process.env.NODEJS_DENGA_CONFIGNAME
});

@JsonController('/config')
export class ConfigController {
    @Get("/")
    async getConf() {
        let conf = settings.store        
        delete conf.db 
        return conf
    }
}