import { Router } from "express";
import HomePage from "../../controllers/WEB/Home";

const router = Router();

// web
router.get('/', HomePage.index);

export default router;