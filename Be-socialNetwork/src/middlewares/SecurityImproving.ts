import lusca from 'lusca';
import { Application } from 'express';
import Locals from '../providers/Local';
class SecurityImproving {

    public static mount(_express :Application) :Application {
        _express.set('trust proxy', 1);
        
        _express.use((req, res, next)=>{
            res.locals.user = req.user;
            res.locals.app = Locals.config();
            next()
        });

        _express.use((req, res, next) => {
            if(req.originalUrl.includes(`/${Locals.config().apiPrefix}/`)){
                next();
            }else{
                lusca.csrf()(req,res,next)
            }
        });

        _express.use(lusca.xframe('SAMEORIGIN'));
        _express.use(lusca.xssProtection(true));
        // _express.use((req, res, next) => callback);
        return _express;
    }
}

export default SecurityImproving;