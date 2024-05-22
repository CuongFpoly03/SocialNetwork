import dotenv from 'dotenv';
import path from 'path';
import {Application} from 'express';

class Locals {
    public static config() : any {
        dotenv.config({path: path.join(__dirname,"../../.env")});
        const port = process.env.PORT || 4000;
        const mongo_url = process.env.MONGO_URL;
        const url = process.env.URL;
        const apiPrefix = process.env.API_PREFIX;
        const appUrl = process.env.APP_URL;
        const secretKey = process.env.SECRET_KEY;
        const emailUser = process.env.EMAIL_USER
        const emailPass = process.env.EMAIL_PASS
        const jwtAccessKey = process.env.JWT_ACCESS_KEY
        const jwtRefreshKey = process.env.JWT_REFRESH_KEY
        return {port, mongo_url, url, apiPrefix, appUrl, secretKey, emailUser, emailPass, jwtAccessKey, jwtRefreshKey};
    }

    public static init(_express: Application) : Application {
        _express.locals.app = this.config();
        return _express;
    }

}

export default Locals;