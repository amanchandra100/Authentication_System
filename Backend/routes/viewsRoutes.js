import express from "express";
import { viewsCountController } from "../controllers/viewsController.js";


//router object
const router = express.Router();


router.get("/viewsCount", viewsCountController);






export default router;