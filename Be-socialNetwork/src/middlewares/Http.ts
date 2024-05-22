import express, { Application } from "express";
import cors from 'cors';
import flash from 'connect-flash';
import helmet from "helmet";
import compression from 'compression';
import session from 'express-session';
import Locals from "../providers/Local";


class Http {
    public static mount(_express: Application): Application {

        _express.use(cors());
        _express.use(flash());

        _express.use(helmet());

        _express.use(compression());

        _express.use(session({
            resave: false,
            secret: Locals.config().secretKey,
            saveUninitialized: false,
            cookie: { secure: false },
            // store : new (MongoDBStore as any)({
            //     uri: process.env.MONGOOSE_URL,
            //     collection: 'sessions', 
            // })
            
        }));


        return _express;
    }
}

export default Http;