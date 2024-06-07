import { Application } from "express";

import Http from "./Http";
// import SecurityImproving from "./SecurityImproving";
import Locals from "../providers/Local";
import CORS from "./Cors";
import Views from "./views";
import Statics from "./static";


class Kernel {
    public static init(_express: Application): Application {

        if (Locals.config().isCorsEnabled){
            _express = CORS.mount(_express);
        }

        _express = Http.mount(_express);
        
        _express = Statics.mount(_express);


        // _express = SecurityImproving.mount(_express);

        // _express = SecurityImproving.mount(_express, callback);

        _express = Views.mount(_express);

        
        return _express;
    }       
}

export default Kernel;