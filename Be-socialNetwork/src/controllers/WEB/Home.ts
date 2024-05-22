import { Request, Response, NextFunction } from "express";

class HomePage {

    public static index(req: Request, res: Response, next: NextFunction) {
        return res.render('index', { title: "Home Page" });
    }
    

}

export default HomePage;