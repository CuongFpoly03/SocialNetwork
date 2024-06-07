import express, { Application } from "express";
import Locals from "./Local";
import { NextFunction, Request, Response } from "express";
import Routes from "./Routes";
import Kernel from "../middlewares/Kernel";
import { exceptionHandler } from "../middlewares/ExceptionHandler";
import PassPort from "./Passport";
import http from "http";
import SocketIo from "./SocketIo";
import CacheRedis from "./Cache";

class Express {
  public express: Application;
  private server: http.Server;
  constructor() {
    this.express = express();
    //socket.io
    this.server = http.createServer(this.express);
    this.mountAll();
  }

  private async mountAll() {
    // Initialize CacheRedis
    //cách 1
    new CacheRedis();
    await CacheRedis.getConnectPromise();  // Wait for Redis to connect
    console.log("Redis client initialized.");
    // cách 2
    // CacheRedis.init();

    // connect .env
    this.express = Locals.init(this.express);
    // Mount Middlewares
    this.express = Kernel.init(this.express);
    //connect passport
    this.express = PassPort.init(this.express);
    //connect router
    this.express = Routes.mountApi(this.express);
    // // Mount Web
    this.express = Routes.mountWeb(this.express);
    // handleError
    this.express.use(
      (error: Error, req: Request, res: Response, next: NextFunction) => {
        exceptionHandler.handleError(error, req, res, next);
      }
    );
    // khoi tao soket.io
    SocketIo.init(this.server);
  }

  public init() {
    const port = Locals.config().port;
    const host = Locals.config().url;

    this.server
      .listen(port, () => {
        console.log(`Run server successfully on ${host}:${port}`);
      })
      .on("error", (_error) => {
        console.log("Error: ", _error);
      });
  }
}
export default new (Express as any)();
