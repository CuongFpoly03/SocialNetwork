import express, { Application } from "express";
import Locals from "./Local";
import { NextFunction, Request, Response } from 'express';
import Routes from "./Routes";
import Kernel from "../middlewares/Kernel";
import { exceptionHandler } from "../middlewares/ExceptionHandler";

class Express {
  public express: Application;

  constructor() {
    this.express = express();
    this.mountAll();
  }

  private mountAll() {
    // connect .env
    this.express = Locals.init(this.express);
    //connect router
    this.express = Routes.mountApi(this.express);
    // Mount Middlewares
    this.express = Kernel.init(this.express);
    // // Mount Web
    this.express = Routes.mountWeb(this.express);
    // handleError
    this.express.use((error: Error, req: Request, res: Response, next: NextFunction) => {
      exceptionHandler.handleError(error, req, res, next)
    })
  }

  public init() {
    const port = Locals.config().port;
    const host = Locals.config().url;

    this.express
      .listen(port, () => {
        console.log(`Run server successfully on ${host}:${port}`);
      })
      .on("error", (_error) => {
        console.log("Error: ", _error);
      });
  }
}
export default new (Express as any)();