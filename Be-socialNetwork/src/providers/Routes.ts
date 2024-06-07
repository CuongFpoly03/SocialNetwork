import { Application } from "express";
import Log from "../middlewares/Log";
import morgan from "morgan";
import Locals from "./Local";
import apiRoutes from "../routes/Api/Api";
import webRouter from '../routes/Web/web';
class Routes {
    public static mountWeb(_express: Application): Application{  
        Log.showLogs("Routes => Mounting Web Routes...");
        _express.use(morgan('short'));
        return _express.use('/', webRouter);
    }
    public static mountApi (_express: Application) : Application {
        Log.showLogs("Routes mounted");
        _express.use(morgan("short"));
        return _express.use(`/${Locals.config().apiPrefix}`,apiRoutes );
    }
}

export default Routes;