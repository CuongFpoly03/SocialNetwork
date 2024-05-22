import cors from 'cors';
import { Application } from 'express';
import Locals from '../providers/Local';

export class CORS {
    public static mount( _express:Application ) : Application{
        _express.use(cors({
            origin: Locals.config().appUrl,
        }));
        return _express;
    }
}

export default CORS;