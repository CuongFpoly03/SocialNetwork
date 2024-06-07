import { Router, Response, Request, NextFunction } from "express";
import GoogleAuth from "../Api/googleApi"
import HomePage from "../../controllers/WEB/Home";

const router = Router();

// google auth 
router.use('/auth', GoogleAuth)

// web
router.get('/', HomePage.index);


export default router;