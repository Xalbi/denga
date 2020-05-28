import { environment_prod } from "./settings/config-prod";
import { environment_dev } from "./settings/config-dev";

export function json () {
    const path_environment = process.env.CONFIG_FROM_ENV_VAR;
    switch(path_environment) {
        case "prod": {
            return environment_prod;
        }
        case "dev": {
            return environment_dev;
        }
        default: {
            return environment_dev;
        }
    }
}
