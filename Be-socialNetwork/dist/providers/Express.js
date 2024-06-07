"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const Local_1 = __importDefault(require("./Local"));
const Routes_1 = __importDefault(require("./Routes"));
const Kernel_1 = __importDefault(require("../middlewares/Kernel"));
const ExceptionHandler_1 = require("../middlewares/ExceptionHandler");
const Passport_1 = __importDefault(require("./Passport"));
const http_1 = __importDefault(require("http"));
const SocketIo_1 = __importDefault(require("./SocketIo"));
const Cache_1 = __importDefault(require("./Cache"));
class Express {
    constructor() {
        this.express = (0, express_1.default)();
        //socket.io
        this.server = http_1.default.createServer(this.express);
        this.mountAll();
    }
    mountAll() {
        return __awaiter(this, void 0, void 0, function* () {
            // Initialize CacheRedis
            //cách 1
            new Cache_1.default();
            yield Cache_1.default.getConnectPromise(); // Wait for Redis to connect
            console.log("Redis client initialized.");
            // cách 2
            // CacheRedis.init();
            // connect .env
            this.express = Local_1.default.init(this.express);
            // Mount Middlewares
            this.express = Kernel_1.default.init(this.express);
            //connect passport
            this.express = Passport_1.default.init(this.express);
            //connect router
            this.express = Routes_1.default.mountApi(this.express);
            // // Mount Web
            this.express = Routes_1.default.mountWeb(this.express);
            // handleError
            this.express.use((error, req, res, next) => {
                ExceptionHandler_1.exceptionHandler.handleError(error, req, res, next);
            });
            // khoi tao soket.io
            SocketIo_1.default.init(this.server);
        });
    }
    init() {
        const port = Local_1.default.config().port;
        const host = Local_1.default.config().url;
        this.server
            .listen(port, () => {
            console.log(`Run server successfully on ${host}:${port}`);
        })
            .on("error", (_error) => {
            console.log("Error: ", _error);
        });
    }
}
exports.default = new Express();
