import { listen } from "@proxtx/framework";
import config from "@proxtx/config";
import fileUpload from "express-fileupload";
import { uploadHandler } from "./private/fileUpload.js";

let res = await listen(config.port);
res.app.use(fileUpload());
res.app.post("/upload", uploadHandler);
console.log("Server running. Port:", config.port);
