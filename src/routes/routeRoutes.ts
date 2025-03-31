import { Router } from "express";
import { createRouteController, getRoutesController  } from "../controllers/routeController";
import { verifyToken } from "../middlewares/authMeddleware";

const router = Router();

router.post("/", verifyToken, createRouteController);
router.get("/", verifyToken, getRoutesController);

export default router;
