"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const Local_1 = __importDefault(require("./Local"));
const Routes_1 = __importDefault(require("./Routes"));
const Kernel_1 = __importDefault(require("../middlewares/Kernel"));
const ExceptionHandler_1 = require("../middlewares/ExceptionHandler");
class Express {
    constructor() {
        this.express = (0, express_1.default)();
        this.mountAll();
    }
    mountAll() {
        // connect .env
        this.express = Local_1.default.init(this.express);
        //connect router
        this.express = Routes_1.default.mountApi(this.express);
        // Mount Middlewares
        this.express = Kernel_1.default.init(this.express);
        // // Mount Web
        this.express = Routes_1.default.mountWeb(this.express);
        // handleError
        this.express.use((error, req, res, next) => {
            ExceptionHandler_1.exceptionHandler.handleError(error, req, res, next);
        });
    }
    init() {
        const port = Local_1.default.config().port;
        const host = Local_1.default.config().url;
        this.express
            .listen(port, () => {
            console.log(`Run server successfully on ${host}:${port}`);
        })
            .on("error", (_error) => {
            console.log("Error: ", _error);
        });
    }
}
exports.default = new Express();
