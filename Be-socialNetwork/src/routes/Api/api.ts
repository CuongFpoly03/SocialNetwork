import { Router, Request, Response } from 'express';
const router = Router();


router.get("/hh", (req: Request, res: Response) => {
    res.json({
        "name" : "cuong"
    })
})

export default router