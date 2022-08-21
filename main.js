import { listen } from "@proxtx/framework";
import config from "@proxtx/config";

let res = await listen(config.port);
//console.log(res);
console.log("Server running. Port:", config.port);
